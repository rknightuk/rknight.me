---
title: Building a PiSight
permalink: /building-a-pisight/index.html
date: 2022-02-10
excerpt: "My notes on building a PiSight"
tags:
layout: post
---

![My finished PiSight](https://rknightuk.s3.amazonaws.com/site/pisight.jpg)

During the pandemic Max Braun managed to squeeze a Pi Zero with camera module [into an Apple iSight camera](https://debugger.medium.com/todays-webcams-are-boring-so-i-brought-back-a-classic-291cc7c94c76). I came across the post a few weeks ago and decided to have a go myself.

Despite the [Rapsberry Pi shortage](https://www.raspberrypi.com/news/supply-chain-shortages-and-our-first-ever-price-increase/) I was able to order a Pi Zero, the [camera module](https://shop.pimoroni.com/products/raspberry-pi-camera-module-v2?variant=19833929735), the [Pi Zero camera cable](https://shop.pimoroni.com/products/camera-cable-raspberry-pi-zero-edition?variant=32092803891283), and an [iSight](https://en.wikipedia.org/wiki/ISight). I ordered the [3D-printed internal chassis](https://github.com/maxbbraun/pisight/blob/master/PiSight.stl) and [this USB adaptor](https://github.com/maxbbraun/pisight/issues/16) from [SGD3D](https://sgd3d.co.uk) which took about a week to arrive.

I followed these [iFixIt teardowns](https://www.ifixit.com/Device/Apple_iSight_Webcam) to work out how to take the iSight apart, then looked at the [issues on the PiSight repo](https://github.com/maxbbraun/pisight/issues), and [this blog post](https://muffinresearch.co.uk/building-a-pisight/), to see other people putting theirs together. The main issue I had was having to trimming off the bottom two corners of the camera module to be able to fit it inside the iSight tube. I used [`showmewebcam`](https://github.com/showmewebcam/showmewebcam) for the software, which boots incredibly quickly and makes it very easy to get going.

Once I'd wrangled it all together I used [Hand Mirror](https://handmirror.app) to check everything was working (the lighting is terrible in this temporary office hence why it's looks so bad):

<center><img src="https://rknightuk.s3.amazonaws.com/site/pisight-hand-mirror.png"></center>

![The chassis](https://rknightuk.s3.amazonaws.com/site/pisight-chassis.jpg)

It may not be the best webcam in the world, but it's easily as good as the one I have in my MacBook, and I can move it around wherever I want. 

### Additional Links

- [Today’s Webcams Are Boring, so I Brought Back a Classic | by Max Braun | Debugger](https://debugger.medium.com/todays-webcams-are-boring-so-i-brought-back-a-classic-291cc7c94c76)
- [Apple FireWire iSight Teardown - YouTube](https://www.youtube.com/watch?v=8l0kpQ_2rj4)
- [Building a PiSight](https://muffinresearch.co.uk/building-a-pisight/)
- [PiSight Monitor Stand](https://github.com/maxbbraun/pisight/tree/26c4cef49d1f5b3d396f66f86c58a1d579e686a7/monitor_stand)
- [iSight Clamp for ToM by quadrivia - Thingiverse](https://www.thingiverse.com/thing:11761)
- [Hand Mirror, for Mac](https://handmirror.app/)
- [peterbay/camera-control: Simple command-line application for controlling camera settings through V4L2.](https://github.com/peterbay/camera-control)
