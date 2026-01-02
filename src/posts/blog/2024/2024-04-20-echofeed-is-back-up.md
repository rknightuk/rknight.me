---
title: EchoFeed is Back Up and Running
permalink: /blog/echofeed-is-back-2024-04-20/index.html
date: 2024-04-20T12:00:00.000Z
excerpt: "I did a couple of fuck ups all at once and caused EchoFeed to go a bit wild"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
repost: This post originally appeared on the now-removed EchoFeed blog
---

This evening you might have seen a wave of posts coming from EchoFeed. I fucked up.

Somehow I ended up leaving some code in which caused the system to never log a post as _sent_ so it would just...keeping sending those posts. I had also switched to a new feed reading system (I've now gone back to the old one) which caused EchoFeed to not read some feed IDs, which is what EchoFeed uses to keep track of posts. Between those two things, everything got messy and exploded.

I apologise to everyone this affected and I will endeavour to make sure this doesn't happen again.
