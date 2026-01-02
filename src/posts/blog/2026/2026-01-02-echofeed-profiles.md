---
title: "EchoFeed Profiles"
permalink: /blog/echofeed-profiles/index.html
date: 2026-01-02T13:48:18.000Z
excerpt: "A basic version of profiles are now available to everyone on EchoFeed"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
---

I'll say this up front: I don't want [EchoFeed](https://echofeed.app) to be a social network. There are many platforms better suited to that and EchoFeed isn't it. Having said that, I do think there's something nice about being able to link to a profile that says "Yeah I use this thing, I like it, look at a photo of my face and stuff" so I made profile pages that can have a photo of your face and stuff.

![A profile page showing my face, that I joined EchoFeed in April 2024, that I have 19 Echoes, 1600 posts, and a bio about me.](https://cdn.rknight.me/site/2026/echofeed-profile-page-robb-fixed.jpg)

There's not much here, by design. Go to [the profile editor](https://echofeed.app/user/profile) in the dashboard from the dropdown in the top right and you can set your username, bio, website, and choose a colour for your profile (and your open graph image). Your profile will show if you're an EchoFeed Pro subscriber, how many echoes you have, and how many posts you've made. It will never expose what feeds you have enabled or posts you've made — I may add something related to this in the future but it will be off by default[^1]. You can turn off your profile at any time by unticking "Profile Enabled".

Speaking of open graph images, to get this out quickly I used [`simonhamp/the-og`](https://github.com/simonhamp/the-og) which is a "_An OpenGraph image generator written purely in PHP_". It pretty simple to use and had a built-in layout that was mostly what I wanted already. I will update these in the future to have more information but for now, they do the job nicely.

![An open graph image showing my profile photo and a url to my EchoFeed profile. The background has a faded EchoFeed logo](https://cdn.rknight.me/site/2026/echofeed-opengraph-robb.jpg)

I'm seeing a couple of instances where opengraph images won't load I _think_ because of caching (which I need for the [stampede problem](https://www.netscout.com/blog/mastodon-stampede)) so if you see something off, let me know. For now, you can check out my profile at [echofeed.app/@robb](https://echofeed.app/@robb).

Tangentially related to this but I'm moving all EchoFeed announcements to here instead of maintaining a separate blog which is overkill. I'll setup redirects and import the existing posts to here in the next few days.

[^1]: hey tech bros, this is called "consent".