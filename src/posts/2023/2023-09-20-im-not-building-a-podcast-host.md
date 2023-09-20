---
title: I'm (Not) Building a Podcast Host
permalink: /im-not-building-a-podcast-host/index.html
date: 2023-09-20T11:32:33.057Z
excerpt: "Why I considered building a podcast host until I did the maths on the costs"
layout: post
---

Late last year I moved [Ruminate](https://ruminatepodcast.com) from Simplecast to it's [own site built with Eleventy](https://rknight.me/bulding-podcast-site-eleventy/) for a two reasons:

1. I wanted full control over how the site looked
2. Simplecast is $15 a month and that's a lot for a show that makes no money

Since then, I've successfully used that same Eleventy site to build the site for [We Got Family](https://wegot.family), my Fast and Furious podcast. Having both my podcasts hosted myself has been great. I can automate uploads, extract the title and description from the file instead of having to copy and paste it into a CMS, and it costs me _basically_ nothing.

One thing I am missing since I moved away from Simplecast is listener/download numbers. This is, in my opinion, the core selling feature of a dedicated podcast host. Each host does the calculations differently (and they all keep their methods secret) but they do all seem to at least attempt to follow this _thrilling_ document titled ["Podcast Measurement Technical Guidelines Version 2.1"](https://iabtechlab.com/wp-content/uploads/2021/03/PodcastMeasurement_v2.1.pdf). There's some boring stuff in there about the poor advertisers who can't get the data they want and some talk about a new, yet-to-happen reporting feature from some apps but the part I care about is counting listens. The hard part of calculating downloads is parsing server logs: if someone listens in a browser, logs will show multiple partial downloads for that file so that should be counted as one listen. 

Thankfully, [Bunny has a very nice log format](https://docs.bunny.net/docs/cdn-log-format) that is easy enough to parse. A quick-and-dirty solution me and [Adam](https://neatnik.net) came up with for counting a single listen is if the IP address, user agent, and file are the same within the same 24 hour period, count that as one listen. This isn't perfect by any means, but will be good enough for what I want.

This attempt at generating listen stats was partially research into an idea I've had running around in my head for at least a year:

> Can you build a podcast host for smaller podcasts like mine for, say, $20 a year?

The accounts, uploading files, hosting websites, is all easy enough but when you consider download costs the answer, after going over some calculations with [Zoe](https://zoeaubert.me), is no. The file egress costs (the cost of downloading the files from a CDN) is too high even for a small show.

Update: I got the calculations wrong here for Bunny's pricing so it _might_ still be viable as a product although the margins are still tight.

As an example, if a show has a 30mb episode and that show gets 500 downloads, that's ~15gb of egress. On [BunnyCDN](https://bunny.net) that would cost somewhere in the region of $1.50. AWS S3 is about the same. Assuming one episode a month (unlikely), that's pretty close to $20 a year.

These calculations don't even take into account older episodes getting more downloads over time (they definitely will) or the show growing over time (it likely will). What about if someone decides to [listen to all 74 episodes of a show at once](https://rknight.me/three-years-of-hemispheric-views-feedback/) leading to 2-3gb of downloads in one go?

There is an argument to be made that variable pricing might work: pay $X per year then monthly pay whatever the CDN cost for your show is but this feels counter-intuitive to building a simple podcast host. I could charge a similar amount as some of the existing services but then I'm not bringing anything new to the table. 

Ultimately every solution to the cost problem goes against my initial idea. Instead, I'm going to focus some time on making my Eleventy podcast site more usable for other people to deploy their own podcasts.