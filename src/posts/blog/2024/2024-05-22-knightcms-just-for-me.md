---
title: "KnightCMS: Just for Me"
permalink: /blog/knightcms-just-for-me/index.html
date: 2024-05-22T07:36:05.592Z
excerpt: "I've decided my new CMS won't be something anyone can just use out the box"
layout: post
tags:
    - Development
    - WeblogPoMo
---

I've been planning out [my mythical CMS](https://rknight.me/blog/my-perfect-cms/) based on [my workflow](https://rknight.me/blog/my-blogging-workflow/) on and off for a while. I know what features it needs. I know how I want it to work. What I haven't been able to work out, is how I could make it work for _other_ people. How does configuration work? Is it hosted? Paid? Open Source? Is it hard to setup?

I look at the likes of [Pages](https://pagescms.org) and [Decap](https://decapcms.org) both of which do the basics well (in theory) but they don't have the advanced things I want like media lookup and some custom stuff around changelogs for example. They also fairly strongly link themselves to Netlify, CloudFlare and other similar services to have the serverless functions run. I just want to run stuff on my server. Having said that, Pages _does_ look very good for standard sites.

You know what's really good at running things on demand _and_ easy to deploy on basically any server? PHP.

I've come to a decision. I'm not building it for other people. The code will be on GitHub for people to look at, take inspiration from, see how it works but it will not be a "just pop your keys in and it'll work for you" project.

Any work I put into trying to make it flexible will cause two problems:

1. It will take longer. Every feature, especially media lookup, will need to consider if the person has API keys and also handle if there are no keys available. What if someone likes a different title capitalisation system?[^1] What if someone wants to slugify their `posts_like_this`?
2. It turns it into something I need to maintain, merge pull requests, answer issues on GitHub, and all the fun that comes with making a thing other people can use.

KnightCMS is going to be just for me and work _exactly_ how I want it to work. I'd love to build a fancy CMS that works for everyone but it's just not going to happen. Let's let [Adam have a go instead](https://neato.pub).

[^1]: I don't have a favourite but I bet someone out there does.