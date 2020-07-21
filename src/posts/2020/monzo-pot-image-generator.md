---
title: Monzo Pot Images Generator
permalink: /monzo-pot-images-generator/index.html
date: 2020-07-21
excerpt: "Generate images for your Monzo pots"
tags:
layout: post
---

While browsing [this thread on the Monzo forums](https://community.monzo.com/t/custom-pot-images-to-use/62748/325) I came up with an idea to generate Monzo pot images whenever I want so I created the [Monzo Pot Image Generator](https://potimages.rknight.me/).

![Monzo Pot Image Generator](https://rknightuk.s3.us-east-1.amazonaws.com/site/preview-image.png)

First thing was to work out how to generate and download the images. This turned out to be relatively easy with a combination of [dom-to-image](https://github.com/tsayen/dom-to-image) and [FileSaver](https://github.com/eligrey/FileSaver.js). To generate a list of the [Font Awesome icons](https://fontawesome.com/) output in the search, I grabbed [the JSON config](https://github.com/FortAwesome/Font-Awesome/blob/master/metadata/icons.json), did a little bit of manipulating in Sublime and used [Eleventy's global data files](https://www.11ty.dev/) to use that data when building the site.

I wanted to keep everything as simple as possible; no build scripts and as few files as possible. I used [Water.css](https://watercss.kognise.dev/) for the base css and the rest of the css is in a `style` tag in the `head` (is that legal?). I also learnt that there is a `type="color"` input - although I might replace this at some point because it's not particularly nice on mobile Safari.

You can also share you pot images with a link [like this](https://potimages.rknight.me/?i=chess-queen&ip=fas&c=333333&bg=b7edd0). I initially used url hashes to keep the url updated all the time, but when sharing these to Twitter they get stripped out so I switched to using query strings instead.