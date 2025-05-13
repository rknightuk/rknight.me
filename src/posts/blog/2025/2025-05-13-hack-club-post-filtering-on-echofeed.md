---
title: "Hack Club: Post Filtering on EchoFeed"
permalink: /blog/hack-club-post-filtering-on-echofeed/index.html
date: 2025-05-13T07:34:01.369Z
excerpt: "I finally built an EchoFeed feature everyone has been asking for"
tags:
    - Development
    - EchoFeed
    - Hackathon
project: https://echofeed.app
---

![The hack club logo on a white background](https://cdn.rknight.me/site/2025/hack-club.jpg)

On Sunday, the folks who run [Hack Pompey](https://hackpompey.co.uk) hosted a new event at the offices of [Waffle](https://wafflegame.net/daily) they're calling Hack Club:

>  a relaxed a day of coding on our side projects and shooting the breeze

This pilot event was invite-only and Ryan was kind enough to invite me so I went along. I _could_ have worked on any number of side project ideas I have in my notes but there is a feature that people have been asking for on [EchoFeed](https://echofeed.app) since it launched: post filtering.

I'd avoided doing this feature because I was worried about how complicated it would be[^1] so I simplified it so it will still cover most use cases but is still easy to explain (and easy to maintain). Each Echo can have up to five rules applied to it and a rule has three attributes:

1. What field we're matching on (e.g. `link`)
2. How to compare it (e.g. contains)
3. What to check for (e.g. `/micro`)

In this example if the link contains `/micro` then the rules have passed — you can choose to either post or not post when any or all rules match.

![EchoFeed posting rules](https://cdn.rknight.me/site/2025/echofeed-posting-rules.png)

I'm still doing some tweaking and testing with this but it should be ready for pro subscribers in the next couple of weeks, along with some other fun features I'm not revealing yet.

[^1]: I even have a pull request dated May last year that I started and abandoned