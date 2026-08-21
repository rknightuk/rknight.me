---
title: "Favicons to Go"
permalink: /blog/favicons-to-go/index.html
date: 2026-08-17T11:11:08.640Z
excerpt: "I made a favicon generator site to work exactly how I want without being riddled with ads"
tags:
    - Development
project: https://favicons.rknight.me
---

The final thing I always do for a project is make the favicon and open graph image but finding a site not riddled with ads to generate these has always been a bit of a challenge. I've mostly been happy with [RealFaviconGenerator](https://realfavicongenerator.net) although there's just too many options for my liking. I've long[^1] had a todo item to try and make my own version that runs entirely client-side and asks the bare minimum of questions. I've now made it and it's called [Favicons to Go](https://favicons.rknight.me). Thanks to [Zoe](https://zoeaubert.me) for helping me with the name.

![A dark background with a round Neon-like sign in the middle that is glowing. It says Favicons to Go with a neon fries in the middle](https://cdn.rknight.me/site/2026/favicons-to-go-open-graph-image.jpg "This might be the best design work I've ever done")

I wanted to make it as easy as possible to go from "I made an icon" to getting all the files I need without too much fiddling with options. Having said that, the site does have options for filling the background of transparent icons, generating an open graph image by centering the uploaded icon, setting the app name (used when saving web apps to your home screen), as well as choosing theme and splashscreen colour. All of this is stored to local storage so you can have your own defaults. Download gives you a zip of the files to put into a project. All done client-side.

From the code side, the icons are rendered to hidden canvases, then converted to png on download. For the favicon, I had to adapt [a node script](https://gist.github.com/larionov-dv/b8c259e933be5d94f2fd579a855766cb) to build it manually. Most of the uploading and local storage code was ripped from [DoodleScan](https://doodlescan.rknight.me). The zip generation is done with [fflate](https://github.com/101arrowz/fflate).

Try [Favicons to Go here](https://favicons.rknight.me).

[^1]: I remember looking at this idea during lockdown in 2020