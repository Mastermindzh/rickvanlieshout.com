---
title: "Debugging millions of PCIe errors on my Linux server with a USB stick"
date: "2026-10-23"
template: "post"
category: "homelab"
tags:
  - "homelab"
  - "linux"
  - "ubuntu"
  - "pcie"
  - "thunderbolt"
  - "troubleshooting"
description: "My Ubuntu server was generating millions of PCIe errors. A USB-C flash drive helped me trace the problem to runtime power management and find a simple workaround."
---

**TL;DR:** One of my Ubuntu servers was generating millions of PCIe AER errors involving an Intel Thunderbolt 5 controller, I found out after it hung. Plugging a USB-C flash drive into the machine stopped the errors immediately and unplugging brought them back. After some experimentation, I found that disabling runtime power management stopped the errors without the use of the USB drive. The workaround is simple, and from what I understood mainstream kernel devs are working on it so I'm considering it fixed for now.

## The problem

One of my Linux servers called `zagreus`, runs Ubuntu on a MINISFORUM MS-02 Ultra mini PC.
As of late it is hosting my Jellyfin since it's encoding and decoding performance is great due to QuickSync.

It's one of those machines that generally just does its thing. Or at least, that's the idea.. it's fully set-up with IAC and I generally don't manage much on it.
Every now and then, however, it would completely freeze. No ping, no SSH, nothing. A hard reboot was the only way to get it responding again.

Naturally, I started digging through the logs but they were surprisingly empty... if you ignore the boatload of `AER|PCIe Bus Error|recovery failed` from journalctl. So after not finding much else, I decided to see just how many times this error (that kept scrolling in front of my face) happened since my last boot:

```bash
sudo journalctl -k -b --no-pager |
  grep -iE 'AER|PCIe Bus Error|recovery failed' |
  wc -l
```

The result?

**7,642,354 entries.**

Yes, over seven million, that's a few more than I'd ideally like to have on a server that I want to be hands-off as much as possible.

## Identifying the culprit

The messages were remarkably consistent:

```text
thunderbolt 0000:84:00.0: AER: can't recover (no error_detected callback)
xhci_hcd 0000:97:00.0: AER: can't recover (no error_detected callback)
pcieport 0000:80:1b.4: AER: device recovery failed
```

There were also more detailed PCIe errors:

```text
PCIe Bus Error: severity=Correctable, type=Transaction Layer
[15] HeaderOF

PCIe Bus Error: severity=Uncorrectable (Non-Fatal), type=Transaction Layer
[20] UnsupReq
[21] ACSViol
```

And after googling wether this was a known issue, and finding similar but unrelated accounts, I also decided to google what AER was. Turns out AER stands for *Advanced Error Reporting*, and it allows the hardware specifically to send errors to software, which is especially nice since journalctl seems to keep them mostly as is.

To figure out which hardware was involved, I used `lspci` on the slot numbers from the error messages:

```bash
lspci -s 80:1b.4 -nn
lspci -s 84:00.0 -nn
lspci -s 97:00.0 -nn
```

That gave me:

```text
80:1b.4 PCI bridge: Intel 800 Series PCH PCIe Root Port #21 [8086:7f44]
84:00.0 USB controller: Intel JHL9580 Thunderbolt 5 NHI [8086:5781]
97:00.0 USB controller: Intel JHL9580 Thunderbolt 5 USB Controller [8086:5782]
```

So the errors were coming from the PCIe hierarchy containing the Intel JHL9580 Barlow Ridge Thunderbolt 5 controller. That narrowed things down considerably and actually allowed me to google for fixes.
On the whole people seemed to agree downgrading the kernel was a good workaround to at least stop the freezes... but as you might know, I do not like workarounds that rigorous.

So I tried other things that people had suggested on the internet.

## A USB stick as a diagnostic tool

One of the suggestions was about power management issues that seemed to go away with a usb-c SSD connected.

The MINISFORUM has multiple USB4 ports, including two high-speed usb-c ports on the front.
I wondered whether actually connecting something to one of these ports would change the behavior of the controller and potentially stop my issues as well.

After all, if I can fix a server crash every once in a while by sacrificing a spare USB drive, well that's a win in my book anyway. I took a SanDisk something something drive that I had laying around and plugged it in...

The kernel detected it normally:

```text
usb 6-1: new SuperSpeed USB device number 2 using xhci_hcd
usb 6-1: New USB device found, idVendor=0781, idProduct=55a9
usb 6-1: Product: SanDisk 3.2Gen1
usb-storage 6-1:1.0: USB Mass Storage device detected
```

And then something interesting happened.

**The PCIe errors stopped. Completely.**

I checked by using the `--since` flag on journalctl:

```bash
sudo journalctl -k --since "2026-10-17 14:40:25" --no-pager |
  grep -iE 'AER|PCIe Bus Error|recovery failed' |
  tail -20
```

Nothing.
After millions of errors, the machine had suddenly gone quiet.
Of course, correlation isn't causation, so I wanted to reproduce it.

## Plug it in, errors disappear. Unplug it, errors return (repeat.. for at least 5 times)

I removed the USB stick.
Almost immediately, the errors returned:

```text
14:57:16 usb 6-1: USB disconnect, device number 2
14:57:17 pcieport 0000:80:1b.4: AER: Correctable error message received
14:57:17 pcieport 0000:80:1b.4: AER: Uncorrectable (Non-Fatal) error message received
14:57:18 thunderbolt 0000:84:00.0: AER: can't recover
14:57:18 xhci_hcd 0000:97:00.0: AER: can't recover
14:57:18 pcieport 0000:80:1b.4: AER: device recovery failed
```

I plugged the stick back in:

```text
14:57:31 usb 6-1: new SuperSpeed USB device number 3 using xhci_hcd
14:57:31 usb 6-1: Product: SanDisk 3.2Gen1
```

And once again, the errors stopped.
To make sure, and because this is fascinating behavior, I tried unplugging and replugging the drive at least 5 times just to see the errors start and stop. Every time the errors stopped right as the USB drive was detected.

That was a useful discovery.

Whatever was going wrong appeared to depend on whether the USB controller had a device connected, and someone on a forum had already suspected power management issues.

## Investigating runtime power management

Linux exposes quite a bit of device power-management information through `sysfs`.
For PCIe devices, the relevant files include:

```text
/sys/bus/pci/devices/<PCI_ADDRESS>/power/control
/sys/bus/pci/devices/<PCI_ADDRESS>/power/runtime_status
```

The `control` file generally accepts two values:

- `auto`: Allow runtime power management.
- `on`: Prevent runtime autosuspension of the device.

The `runtime_status` file reports whether a device is currently active, suspended, or in another runtime PM state.

I checked the three devices involved:

```bash
for dev in 0000:80:1b.4 0000:84:00.0 0000:97:00.0; do
  lspci -s "$dev" -nn
  cat "/sys/bus/pci/devices/$dev/power/control"
  cat "/sys/bus/pci/devices/$dev/power/runtime_status"
done
```

With the USB stick connected, the results were:

| Device                     | Control | Status    |
| -------------------------- | ------- | --------- |
| PCIe root port             | auto    | active    |
| Thunderbolt NHI            | auto    | suspended |
| Thunderbolt USB controller | auto    | active    |

Interesting.

Even with the flash drive connected, the Thunderbolt NHI was suspended. The USB controller, however, was active.
That made me suspect that the USB controller's runtime power state, rather than simply the Thunderbolt controller being awake, might be involved (and forum guy/gal was on to something!).

## Testing the workaround

Rather than immediately changing kernel parameters or BIOS settings, I decided to disable runtime power management temporarily for the three affected PCIe devices.

```bash
for dev in 0000:80:1b.4 0000:84:00.0 0000:97:00.0; do
  echo on | sudo tee "/sys/bus/pci/devices/$dev/power/control"
done
```

This tells Linux not to runtime-suspend these devices.
I verified the results:

```text
0000:80:1b.4: on / active
0000:84:00.0: on / active
0000:97:00.0: on / active
```

Then I removed the USB stick again.
Previously, that had caused the errors to pop up instantly.. but with the suspend disabled no errors showed up now!
The kernel did report the USB device disconnecting:

```text
15:02:45 usb 6-1: USB disconnect, device number 3
```

But the PCIe error storm didn't return. I checked with:

```bash
sudo journalctl -k --since "2026-10-17 15:02:45" --no-pager |
  grep -iE 'AER|PCIe Bus Error|recovery failed' |
  tail -20
```

Disabling runtime power management had reproduced the stabilizing effect of leaving the USB stick connected, but you know, without the stick connected.

## Making the workaround persistent

The sysfs settings are temporary. A reboot will restore the kernel's default runtime PM configuration.
For a machine managed through Ansible, that's not particularly difficult to address.

I made a simple install block:

```yml
    - name: Apply the Thunderbolt 5 runtime PM workaround
      when: tb5_runtime_pm_workaround | bool
      block:
        - name: Install the Thunderbolt 5 runtime PM script
          ansible.builtin.copy:
            dest: /usr/local/sbin/tb5-runtime-pm
            owner: root
            group: root
            mode: "0755"
            content: |
              #!/bin/sh
              # Managed by Ansible (playbooks/hosts/zagreus.yml).
              # Sets power/control=on for known Thunderbolt 5 PCIe devices,
              # only if the PCI vendor:device ID at each address matches.
              set -u
              rc=0
              for entry in 0000:80:1b.4=0x8086:0x7f44 0000:84:00.0=0x8086:0x5781 0000:97:00.0=0x8086:0x5782; do
                addr="${entry%%=*}"
                want="${entry#*=}"
                dev="/sys/bus/pci/devices/$addr"
                if [ ! -e "$dev/power/control" ]; then
                  echo "$addr: device not present, skipping" >&2
                  rc=1
                  continue
                fi
                have="$(cat "$dev/vendor"):$(cat "$dev/device")"
                if [ "$have" != "$want" ]; then
                  echo "$addr: found $have, expected $want, skipping" >&2
                  rc=1
                  continue
                fi
                if ! echo on > "$dev/power/control"; then
                  echo "$addr: failed to write power/control" >&2
                  rc=1
                  continue
                fi
                echo "$addr ($have): power/control=$(cat "$dev/power/control") runtime_status=$(cat "$dev/power/runtime_status")"
              done
              exit "$rc"
          notify: Restart tb5-runtime-pm
```

, a corresponding managed service:

```yml
        - name: Install the Thunderbolt 5 runtime PM service
          ansible.builtin.copy:
            dest: /etc/systemd/system/tb5-runtime-pm.service
            owner: root
            group: root
            mode: "0644"
            content: |
              [Unit]
              Description=Disable runtime PM on Thunderbolt 5 PCIe devices (AER storm workaround)

              [Service]
              Type=oneshot
              RemainAfterExit=yes
              ExecStart=/usr/local/sbin/tb5-runtime-pm

              [Install]
              WantedBy=multi-user.target
          notify: Restart tb5-runtime-pm

        - name: Enable and start the Thunderbolt 5 runtime PM service
          ansible.builtin.systemd:
            name: tb5-runtime-pm.service
            enabled: true
            state: started
            daemon_reload: true
```

, and as you can see, I surrounded it all with a boolean to enable/disable (so yes, I also made a disable script..)

## Is the problem solved?

Technically? No. But for my use-case? Yes.

- established a reproducible relationship between USB device presence, runtime power management, and the PCIe AER error storm.
- found a simple workaround that prevents the observed errors.

What I haven't established yet is the actual underlying defect.
Possible explanations include a Linux driver issue, Thunderbolt controller firmware behavior, or an interaction between the controller and the platform's power management. No one online seems to have figured it out but the consensus seems to be "we will wait for Linux to patch it".

And, with the workaround in place, that seems sensible to me... so I'll wait as well 😀.

## Conclusion

What I like about this kind of debugging is that the eventual workaround can be ridiculously simple, even when the symptoms initially look complicated.
Millions of kernel errors, PCIe recovery failures, Thunderbolt controllers (that I barely understand), and a server that randomly freezes.

And the breakthrough came from plugging in a USB stick, as suggested by someone in one of the forums.

The useful part wasn't the USB stick itself. It was the ability to change one thing, observe the result, reverse the change, and reproduce the behavior.
After you've got a reliable path to reproduce something you can iteratively work on it and eventually that'll bring you the fix.

PS: yes, for me this applies to most things in life, neat huh.
