---
title: Custom Sidebar Icons in Finder
permalink: /blog/custom-sidebar-icons-in-finder/index.html
date: 2023-06-29T16:28:34.602Z
excerpt: "Setting custom sidebar icons for folders in MacOS. Managed to get this working with a lot of trial and error"
layout: post
tags:
  - Development
  - MacOS
project: https://github.com/rknightuk/custom-finder-sidebar-icons
---

![Custom icons in the Finder](https://cdn.rknight.me/site/custom-icons.png)

MacOS customisation is basically dead. Plenty of apps that used to work, no longer do. You can still have custom folder icons which is nice but I wanted custom sidebar icons for those folders, like [the developer one](https://rknight.me/micro/110615734381939778/). 

I started googling around trying to find something for recent versions of MacOS and the only thing I found was [this Reddit post](https://www.reddit.com/r/mac/comments/seig87/how_to_make_custom_finder_sidebar_icons_big_sur/) outlining a method to do it with PNGs. Between me and [Keir](https://www.keiransell.com) we were able to make it work not only with any standard [SF Symbol](https://developer.apple.com/sf-symbols/) but custom made ones as well.

You'll need Xcode installed to do this but the instructions relatively simple. I will say it's _really_ flaky when building, sometimes it works, sometimes it doesn't, sometimes it just shows a random icon instead. All of the instructions are on [the GitHub repository](https://github.com/rknightuk/custom-finder-sidebar-icons) including some dandy screencasts from Keir.