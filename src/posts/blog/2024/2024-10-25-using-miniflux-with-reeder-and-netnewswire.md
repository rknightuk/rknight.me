---
title: "Using Miniflux with Reeder and NetNewsWire"
permalink: /blog/using-miniflux-with-reeder-and-netnewswire/index.html
date: 2024-10-25T11:14:36.069Z
excerpt: "Instructions on how to log into Miniflux with Reeder and NetNewsWire"
layout: post
tags:
    - Apps
    - SelfHosted
---

Trying to find the answer to how to use [Miniflux](https://miniflux.app) with [Reeder (app)](https://reederapp.com) and the Google Reader API proved to be a bit difficult due to the similarly of the app name and the API name. Or maybe I was sleep deprived. Either way, I finally worked it out but I never found a definitive "this is how you do it" just lots of vague Reddit threads so here we are.

In Miniflux go to `Settings` > `Integrations` > `Google Reader` and set a username and password.

![Google Reader settings in Miniflux](https://cdn.rknight.me/site/miniflux-google-reader-settings.jpg)

Once that's set, in Reeder choose "Reader" in the add account screen, set the domain you've got Miniflux hosted at and away you go.

![Reeder settings for Miniflux](https://cdn.rknight.me/site/reeder-reader-settings.png)

To use Miniflux in NetNewsWire follow step one then choose FreshRSS in the add account screen. Make sure to _not_ have a trailing slash after your domain in NetNewsWire otherwise it will error.