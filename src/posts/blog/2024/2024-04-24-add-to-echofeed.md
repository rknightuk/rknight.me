---
title: Add to EchoFeed
permalink: /blog/add-to-echofeed/index.html
date: 2024-04-24T12:00:00.000Z
excerpt: "I added a new system so other services can link directly into EchoFeed"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
repost: This post originally appeared on the now-removed EchoFeed blog
---

On the suggestion of Vincent of [Scribbles](https://scribbles.page) fame, a few days ago I added a new feature to EchoFeed for people who run services that generate RSS feeds like blogging platforms.

![Add to EchoFeed button](/img/button.png)

Add to EchoFeed is a simple system to be able to direct users to add their feeds to EchoFeed in a more automated way. This can be done by passing `feed` to the new echo path like so:

```
https://echofeed.app/echoes/new?feed=MYFEED
```

Where `MYFEED` is your user's feed they want to add. EchoFeed will check the feed to validate it and add it to their account (if it doesn't already exist) and then direct them to set up a service to post to.

This is already available in [weblog on omg.lol](https://home.omg.lol/referred-by/robb) and in [Scribbles](https://scribbles.page) and you can read the docs for [Send to EchoFeed](https://help.echofeed.app/add-to-echofeed/) here.
