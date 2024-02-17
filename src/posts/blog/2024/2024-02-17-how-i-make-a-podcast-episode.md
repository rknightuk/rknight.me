---
title: "How I Make a Podcast Episode"
permalink: /blog/how-i-make-a-podcast-episode/index.html
date: 2024-02-17T12:45:47.234Z
excerpt: "A quick overview of how I record, edit, and release a podcast episode"
layout: post
tags:
    - Podcasting
project: https://ruminatepodcast.com
---

This post was originally in [my wiki](/intersect) but I decided it made more sense to have it as a post.

I have recorded and edited over 175 episodes of [my](https://www.ruminatepodcast.com/) [podcasts](https://wegot.family/) so I know _some_ things about podcasts but this is basically a list of things I use. If you want to hear from actual professionals I recommend [episode 200 of Upgrade](https://www.relay.fm/upgrade/200).

I record using a [Razer Seiren Mini](https://www.razer.com/streaming-microphones/razer-seiren-mini/RZ19-03450100-R3M1). I previously used a [Blue Yeti](https://www.bluemic.com/en-gb/products/yeti/). There are much better microphones available but for what I do, the Razer is fine.

I record my microphone and the call itself, as a backup, with [Audio Hijack Pro](https://rogueamoeba.com/audiohijackpro/). My setup looks likes this:

![Audio Hijack Setup](https://rknightuk.s3.amazonaws.com/site/audio-hijack.jpg)

The Skype (or Facetime or Zoom) audio is recorded to a file and output to my headphones. My microphone input is then recorded to it's own file.

Once recording is done and I have both files (mine and my cohost's), I edit the show in [GarageBand](https://www.apple.com/uk/mac/garageband/). I mostly just need to remove any cross-talk and little noises. It would probably be easier in [Logic Pro](https://www.apple.com/uk/logic-pro/) but I can't justify paying for it. I then export the edited episode to a `.wav` file.

To add metadata like titles, descriptions, chapters, and the cover art I use Marco Arment's [Forecast](https://overcast.fm/forecast) and export it to `mp3` from there.

Finally I upload the file to my CDN and add the episode to the podcast website - which is a [custom-built Eleventy site](https://github.com/rknightuk/ruminate).