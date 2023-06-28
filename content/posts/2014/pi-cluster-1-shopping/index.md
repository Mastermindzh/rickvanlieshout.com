---
title: "Raspberry pi cluster Step 1: Shopping"
date: "2014-09-05 23:00"
template: "post"
category: "Homelab"
tags:
  - "raspberry"
  - "cluster"
  - "pi"
description: "Ordering the parts for a nice little pi cluster"
disqusId: "2"
---

## So, A raspberry pi cluster. What is it and what does it do?

Well, a raspberry pi is a small $35 dollar Linux computer with an SD card as a hard drive and an USB cable as it's power source. While they are only $35, they perform really well!

A cluster is basically a group of computers that work together to run a very intensive program. Say for example you needed to calculate 1000 things with a single raspberry pi and every calculation takes 1 second. That would be 1000 seconds! Now if you add a second raspberry pi and you have them share the load they will be twice as fast! Imagine running 4 of them, that would cut it down to 250 seconds! Well that's exactly what I plan on doing

## What software are you going to use?

I am going to use [raspbian](https://www.raspbian.org/) for the OS and I will be using python (and [mpi4py](https://mpi4py.scipy.org/)) to program the cluster.

## What did you need and how much did it cost

Below you will find a list of items you would need if you were to build a 4 pi cluster from scratch. Prices are in Euro's because that's what I pay with (I know, crazy right?)

- 4 raspberry pis ( €131.80 )
- 4 ethernet cables ( €3.40 )
- 4 USB power cables ( €7.20 )
- 4 sd cards ( €12.72 )
- 4 raspberry pi cases ( €11.72 )
- An Ethernet hub ( €10.95 )
- An USB hub ( €2.64 )

This all adds up to ( €180.43 which is $233.76 according to [google](https://www.google.nl/search?site=&source=hp&q=180.43+euro+to+dollar&oq=180.43+euro+to+dollar&gs_l=hp.3..33i21l2.879.5191.0.5287.28.24.3.1.1.0.157.1273.22j1.23.0....0...1c.1.53.hp..9.19.917.0.jex09uDmbow))

I ordered **some** of the stuff from a shop in china called "[banggood](https://banggood.com)". Since they deliver all around the world I will add the links to those items below.

- The raspberry pi cases can be found [here](https://www.banggood.com/Transparent-Box-Case-Shell-For-Raspberry-Pi-512MB-Version-p-923015.html)
- The 8gb SD cards can be found [here](https://www.banggood.com/8GB-SD-HC-SDHC-Flash-Secure-Digital-Memory-Card-Camera-p-938458.html)
- The USB hub can be found [here](https://www.banggood.com/Wholesale-Laptop-PC-New-Black-4-Port-Tap-USB-2_0-High-Speed-Hub-ON-Or-OFF-Sharing-Switch-p-45306.html)
- The USB power cables can be found [here](https://www.banggood.com/Retractable-Micro-USB-Data-Sync-Charger-Cable-For-Cellphones-p-90245.html)
