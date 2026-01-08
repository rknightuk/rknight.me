---
title: "String Replacements on EchoFeed"
permalink: /blog/string-replacements-on-echofeed/index.html
date: 2026-01-08T13:04:42.625Z
excerpt: "A solution to swapping usernames when cross posting between Mastodon and Bluesky"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
---

One request I've had quite a bit for [EchoFeed](https://echofeed.app) is to be able to handle specific, known usernames, between Mastodon and Bluesky where they are different (which is almost always the case). Some [pastry-themed](https://croissantapp.com/) apps already have something similar but for EchoFeed it needed to work differently.

For EchoFeed, I've gone for the simplest solution which is also the most flexible - straight string replacement. "Replace THIS with THAT", or in real terms, "replace `@robb@social.lol` with `@rknight.me` when cross posting between Mastodon and Bluesky. Maybe you want to replace `utm_source=mastodon` with `utm_source=bluesky` because you're a big Business™ boy or replace every mention of "Twitter" with "the deep fake porn and hate platform" because you understand you don't hang out at Nazi bars no matter what. You can replace literally anything, it's up to you. [The documentation](https://help.echofeed.app/replacements/) has a bit more information about how they work.

![A form showing find and replace values for two different usernames](https://cdn.rknight.me/echofeed/replacements-echofeed-user-names.jpg)

EchoFeed won't replace strings in links and has the option to only do case-sensitive replacements. Replacements is an EchoFeed Pro feature and is available now.