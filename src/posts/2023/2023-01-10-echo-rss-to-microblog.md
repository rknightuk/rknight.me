---
title: "Import RSS to Micro.blog and Mastodon with Echo"
permalink: /echo-rss-to-microblog/index.html
date: 2023-01-10
excerpt: "Echo is a node script to post new items from an RSS feed to Micro.blog"
layout: post
---

![Screenshot of Echo running in a terminal](https://rknightuk.s3.amazonaws.com/site/echo-screenshot.png)

**Update 13/01/23**: Echo now supports Mastodon and webhooks as well as Micro.blog. [Check out the website for more details](https://echo.rknight.me).

After a conversation with [Zoe](https://zoeaubert.me) about [status.lol](https://status.lol), as well as [this reply from Markus](https://micro.blog/muhh/15830286), I decided to write [Echo](https://github.com/rknightuk/echo) last night (do I know how to party on my birthday or what?). From the readme:

> Echo is a node script to post new items from an RSS feed to Micro.blog

Micro.blog already supports importing RSS feeds and handles it very well but ~~I'm a control freak~~ I wanted a bit more control over the formatting as well as assigning categories on import.

Echo takes a config of RSS feeds as well as some formatting functions for items and posts them to Micro.blog. I run mine every 15 minutes but you could set it up to run whenever you want. The only requirements are `node` and `npm` and a server to run it on (or you could run it on your computer and manually run it as and when).

[Download Echo on GitHub](https://github.com/rknightuk/echo)
