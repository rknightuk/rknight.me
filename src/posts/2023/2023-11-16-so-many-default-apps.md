---
title: So Many Default Apps
permalink: /blog/so-many-default-apps/index.html
date: 2023-11-16T22:16:38.787Z
excerpt: "A look at just over two weeks of adding submissions and features to the default apps website"
layout: post
tags:
  - Apps
  - Development
  - Podcasting
---

Two weeks ago when [Hemispheric Views 097](https://listen.hemisphericviews.com/097) released and [people](https://gabz.blog/2023/11/03/my-defaults.html) [started](https://rknight.me/app-defaults/) [putting](https://maique.eu/2023/11/03/defaults.html) [up](https://lmika.org/2023/11/04/defaults.html) [their](https://alpine.weblog.lol/2023/11/the-defaults) [default](https://canion.blog/2023/11/04/duel-of-the.html) [app](https://www.andycarolan.com/appdefaults) [posts](https://mb.esamecar.net/2023/11/04/app-defaults.html) [Jason](https://grepjason.sh/) said this in the HV Discord:

> take a hike `/now`. It's all about `/default` now

I decided to quickly throw a site together to collect all these (at the time eight) blog posts in one place: [App Defaults](https://defaults.rknight.me/). I used this old web framework you might have heard of called "artisanal hand-crafted HTML". It was only seven links, maybe a couple more, manually adding a new link didn't seem like a problem. Until _way_ more than that arrived. At it's peak, there were 35 new posts added to the list. As of this post, there are 151 posts listed.

|**Date**|**Posts Added**|
|---|---|
|**4/11**|15|
|**5/11**|10|
|**6/11**|5|
|**7/11**|35|
|**8/11**|24|
|**9/11**|14|
|**10/11**|7|
|**11/11**|10|
|**12/11**|11|
|**13/11**|6|
|**14/11**|7|
|**15/11**|5|
|**16/11**|2|
|Total|151|

Three days in I realised this was likely to take off so I switched the site to [Eleventy](https://11ty.dev) and a `json` data file to keep track of the blog posts. I also added RSS feeds for everyone's sites.

Day four was the busiest for submissions and I had a fun idea to allow anyone to subscribe to _all_ of the websites mentioned. I generated [an OPML file](https://github.com/rknightuk/app-defaults/blob/main/opml.njk) from the site data and added a link to that to the site.
### Network Graph

The latest feature was added today when I was inspired by something said on [episode 098](https://listen.hemisphericviews.com/098) but as of this moment I cannot remember what it was that was said. Regardless, I wanted to visualise the links between all the blog posts to get a sense of how the "trend" spread between people so I created [the Network Graph page](https://defaults.rknight.me/network/). 

To achieve this I used [@extractus/article-extractor](https://github.com/extractus/article-extractor) to extract the article contents from every post, then I used [linkedom](https://github.com/WebReflection/linkedom) to get all the links contained in each article, and then I mapped each of those links to the post they were linking to. Finally I ran a script to map that data to the format required for [`network`](https://visjs.github.io/vis-network/docs/network/index.html) to render the graph. This is the same graph used on [omg.lol](https://home.omg.lol/referred-by/robb) to show the referral data and thankfully I could look at Adam's implementation to speed things up.

A few stats to finish:

- 67 of the sites were added via a pull request on GitHub
- The most popular TLD is, unsurprisingly, `.com` (48 posts). `.blog`, `.me`, and `.net` were tied for second with 13 posts each.
- 144 of the 151 sites have RSS feeds 🙌