---
title: "Shellshock and why you shouldn't get your panties in a bunch."
date: "2014-09-27:23:00"
template: "post"
category: "exploits"
tags:
  - "exploits"
  - "vulnerabilities"
  - "bash"
  - "bug"
description: "In today's blog I share my opinion on shellshock and why I think you shouldn't get your panties in a bunch! hah!"
disqusId: "8"
---

On September 24 2014, A Bash vulnerability, known as "Shellshock" was disclosed. This "bug" allows an attacker to run code on your machine, which is bad, very bad.

<figure class="float-right" style="width: 420px">
	<img src="/media/hackzors.png" alt="terminal with shellshock exploit">
</figure>

Now then, what exactly is "Shellshock". Shellshock is a "bug" (or vulnerability) that can be used to remotely run code on someone's machine by altering an environment variable. The real danger however lies in programs that can alter these variables without requiring root. Thus enabling anyone with access to your computer to run commands.
Imagine someone attacking you twice, the first time they'll create a user and the second time they'll set a password for the user. After that they can just log in to your system and destroy the entire thing, or worse still, monitor your every move.
Some examples of the services which can alter environment variables without root privileges are:

- OpenSSH (which 90% of all Linux distros use)\*
- DHCP clients
- Apache servers with CGI scripts

## When are you vulnerable?

This seems to be a point many news sites forget about. When exactly are you vulnerable and how worried should you be. The thing is, in order for you to be vulnerable you'd have to have one of two things:

- A server which is open to the world (web,vps, etc.)
- An intruder in your network.

Most people won't have either one of those things. And to be fair, if you can't trust the people on your own network you've got far bigger problems than "Shellshock". Unless of course you're using a whole lot of "free-wifi" services, in which case you really don't know who is on the network.

I'd imagine the number of people having a "server" , or simply a computer which is accessible from outside your home network is way higher. So if you are one of those people, please patch your bash to avoid any trouble. ( I too like to have an easy way to log into my server from anywhere (work / family / vacation) and thus I would be vulnerable.)

## How to test whether you're vulnerable

Testing whether you're vulnerable is quite easy. You can just use this "attack" on yourself with an "echo" command (which won't cause any harm). If it works, you're vulnerable. If it doesn't you're not.
Here's how to construct a test command:

```bash
env x='() { :;}; echo vulnerable' bash -c 'echo hello'
```

If you're **not** vulnerable you'll get:

```bash
bash: warning: x: ignoring function definition attempt bash: error importing function definition for `x' hello
```

You might also simply get "hello".
If you **are** vulnerable however you'll get:

```bash
vulnerable hello
```

## How to patch your system

By now most distributions have updated their repo to include the patched version of bash. If that is the case you can simply do a regular update:

### Ubuntu / re-spins

```bash
sudo apt-get update && sudo apt-get upgrade
```

### Arch / re-spins

```bash
sudo pacman -Syu
```

If however you're using a mac you'll have to do it by hand. Since Apple hasn't yet released an update nor commented on the matter. Instructions for a mac can be found [here](http://mac-how-to.wonderhowto.com/how-to/every-mac-is-vulnerable-shellshock-bash-exploit-heres-patch-os-x-0157606/).

## In summary

So should you worry? Yes and no. If your computer (/server) is exposed to an outside network you should absolutely worry. If it's not however you are relatively safe. Still, patching is a simple and fast process, so just patch it and get on with your life !

## Documentation

For those of you who like to research this "Shellshock" vulnerability some more, here are 2 entries in the NVD: [CVE-2014-6271](http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-6271) & [CVE-2014-7169](http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-7169).

If you want to see Shellshock in action I recommend watching the following video from Quidsup:

<iframe src="//www.youtube.com/embed/UllSNdgGLbo" allowfullscreen="" width="560" height="235" frameborder="0"></iframe>
