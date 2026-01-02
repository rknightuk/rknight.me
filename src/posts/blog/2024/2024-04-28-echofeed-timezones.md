---
title: Timezones and EchoFeed
permalink: /blog/echofeed-timezones/index.html
date: 2024-04-28T21:28:06.280Z
excerpt: "I added support for choosing a timezone to fix some strange posting issues"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
repost: This post originally appeared on the now-removed EchoFeed blog
---

I live in ~~the best timezone in the world~~ GMT and because of this it's common for me to miss timezone-related things in my code. EchoFeed was no different.

I output the post date to a bunch of different formats and variables but as [Anne](https://anniegreens.lol/), who doesn't live in the best timezone, pointed out to me this would set her posts a day ahead if it happened later in the day her time.

So you can now set your timezone on your profile and this will be applied to the date variables.
