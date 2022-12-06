---
title: Lite YouTube for Micro.blog
permalink: /lite-youtube-for-micro-blog/index.html
date: 2022-12-06
excerpt: "A plugin to automatically append Lite YouTube embeds to posts"
layout: post
---

I've published a new [Micro.blog](https://micro.blog) plugin called [Lite YouTube](https://github.com/rknightuk/micro-blog-lite-youtube) which does one thing: finds YouTube links in posts and appends a [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) to the post. Example before and after below:

![](https://rknightuk.s3.amazonaws.com/site/lite-youtube-before.png)

![](https://rknightuk.s3.amazonaws.com/site/lite-youtube-after.png)

You can see it working on [this post about The Last of Us](https://toot.rknight.me/2022/12/04/last-of-us.html) or on [this post with two videos](https://toot.rknight.me/2022/11/22/i-just-realised.html).

Why did I do this instead of using [YouTube shortcodes](https://discourse.gohugo.io/t/embed-youtube-video/2692/7)? Two reasons:

1. Shortcodes are great but what if I change where my site is hosted? Those links won't work any more
2. (This is the real reason) I will forget, I'm too lazy to do it, this is automatic.

You can install it [from the plug-in directory](https://micro.blog/account/plugins/view/83) and [view the code on GitHub](https://github.com/rknightuk/micro-blog-lite-youtube).