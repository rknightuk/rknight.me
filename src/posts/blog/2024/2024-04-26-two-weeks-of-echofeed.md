---
title: "Two Weeks of EchoFeed"
permalink: /blog/two-weeks-of-echofeed/index.html
date: 2024-04-26T11:28:19.621Z
excerpt: "EchoFeed launched two weeks ago and it's been more successful than I could have hoped."
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
---

The past two weeks have been busy with [EchoFeed](https://echofeed.app). I launched it after a brief beta period, lots of folks started using it, I [fucked up](https://news.echofeed.app/echofeed-is-back-2024-04-20/), fixed that, and it's sent over 1700 posts already.

Lots of folks wrote about it, many of them as a test of EchoFeed which is very meta, including [John](https://scribbles.jbowdre.lol/post/from-scribbles-to-gemini-with-echofeed), [Jason](https://stuffandthings.lol/blog/echomg/), [Habib](https://www.chamline.net/echofeed-send-your-posts-all-over-the-web/), [Jcrabapple](https://cool-as-heck.blog/post/echofeed-is-here), [Stefan](https://eay.cc/2024/echofeed-send-your-posts-all-over-the-web/#footnote_0_39608), [Lou](https://louplummer.lol/post/supporting-something-new), and [Lewis](https://lewisdale.dev/post/new-bike-s-day/). I like the final quote of [Kev's post](https://kevquirk.com/cross-posting-with-echofeed) because it encompasses exactly what I'm going for with EchoFeed:

>  if you're looking for a no hassle cross-posting service that's cheap, but works _extremely_ well, check out EchoFeed.

[Michael has a great flow chart](https://mihobu.lol/2024/04/automatic-archival-using-echofeed) of how he's using EchoFeed. With that in mind, I thought I'd do the same and show what I'm doing with EchoFeed:

![My Echoes in EchoFeed](http://cdn.rknight.me/site/the-echofeed-flow.jpg)


Along with a lot of bug fixes and UI improvements, I've added these features since it launched:

- Added the [Amplify](https://beep.town/@echofeedamplify) Mastodon account to boost Echoed posts. I'm really happy with how this has turned out - my timeline is filled with loads of interesting posts I otherwise wouldn't have seen
- Added support for Bluesky and it's stupidly small image sizes
- Added visibility support for Mastodon
- Added support for `heic` files
- Added sending Discord webhooks
- Flickr images get converted from thumbnails to large size
- Variables get inserted where the cursor is not at the end
- Tags supported on Atom feeds
- Manage and disconnect unused services and feeds
- Images from Mastodon RSS feeds get extracted and can be cross posted
- Alt text is now extracted from images and included in posts to Mastodon and Bluesky where it's available 
- The [Add to EchoFeed api](https://help.echofeed.app/add-to-echofeed/) which has already been implemented in [omg.lol](https://home.omg.lol/referred-by/robb) and [Scribbles](https://scribbles.page)

I also have a big list of features that I want to implement including:

- Setting your timezone: Times and dates are current in EU time regardless of origin
- Custom titles for Echoes
- Filtering: If X contains Y send or don't send
- Hide variables: e.g. If a service doesn't support HTML, don't show the `content` variable
- Basic logic support (if/else/etc): This will likely be handlebars or mustache but I haven't decided yet
- Custom headers for webhooks: IFTTT require specific headers to function

I also wrote [on the EchoFeed blog](https://news.echofeed.app/echofeed-and-posse/) about where EchoFeed fits with POSSE and what I want the service to be: "_A no-hassle cross-poster for the IndieWeb_". There are other features I am considering that have been suggested and if I think they meet the goals of EchoFeed I will get them added.

Thank you to everyone who has signed up, written, or posted about EchoFeed, I really appreciate it.