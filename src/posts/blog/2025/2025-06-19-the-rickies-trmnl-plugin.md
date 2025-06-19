---
title: "The Rickies TRMNL Plugin"
permalink: /blog/the-rickies-trmnl-plugin/index.html
date: 2025-06-19T19:51:26.352Z
excerpt: "I made a TRMNL plugin to keep track of the chairmen"
tags:
    - Development
    - Podcasting
---

I was listening to [the results of the Rickies](https://www.relay.fm/connected/556) a couple of days ago and realised it was a perfect candidate for a plugin for my [TRMNL](https://usetrmnl.com/).

Both [Rickipedia](https://rickies.net/) and [The Rickies](https://rickies.co) have API endpoints to check these things — I ended up using Rickipedia as it had more info available to do what I needed.

![The Rickies winner on a TRMNL screen](https://cdn.rknight.me/site/2025/trmnl-rickies.jpg)

The plugin handles the scenario like now where we have a benchman as well as if there are separate keynote and annual chairmen. I spent some time working out the percentages so I can place the winner "magnets" on the globe and if I resize it it still works which will come in handy if I add any new views or modes.

You can [install it here](https://usetrmnl.com/recipes/97896), search "The Rickies" on the plugins page, or the code [is on GitHub](https://github.com/rknightuk/trmnl-the-rickies/tree/main).