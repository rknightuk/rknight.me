---
title: Building a Podcast Site with Eleventy
permalink: /bulding-podcast-site-eleventy/index.html
date: 2022-12-28
excerpt: "Moving Ruminate's site from Simplecast to Eleventy"
layout: post
tags:
    - Podcasting
    - Eleventy
    - Development
---

When me and John started [Ruminate](https://ruminatepodcast.com), we didn't know much about hosting podcasts so we decided to go with [Simplecast](https://simplecast.com) to host and manage the podcast. Seven years later, Simplecast has changed quite a bit to the point that it's hindering rather than helping me post the show. It's not a bad service, but it's overkill for posting one episode every two weeks.

I [asked](https://toot.rknight.me/2022/12/23/has-anyone-moved.html) last week if anyone had self-hosted a podcast and a few people I trust said it should be easy enough to do so I got to work. As with most of my projects, I used [Eleventy](https://www.11ty.dev/). Eleventy is a very powerful static site generator that this site is built with. [This post](https://www.marclittlemore.com/create-an-eleventy-podcast-feed/) was very helpful in pointing me in the right direction.

## Importing existing posts

The first step was to import the existing 156 episodes into the new site. I had a look at the RSS feed to see what metadata each episode would need. Here is an example from [episode 156](https://ruminatepodcast.com/156/):

```yaml
layout: episode
guid: ff7d5a18-c87c-4420-a6dd-965be716aa12
title: "156 - For Listeners Only"
published: "Wed, 7 Dec 2022 20:55:06 +0000"
permalink: 156/index.html
file: "https://ruminatepod.s3-us-west-2.amazonaws.com/156.mp3"
length: 10993430
duration: 00:22:49
summary: "Baguettes and Obsidian."
episodeNumber: 156
```

I created a new script called [`feedtomarkdown.js`](https://github.com/rknightuk/ruminate/blob/main/scripts/feedtomarkdown.js), used [`node-fetch`](https://www.npmjs.com/package/node-fetch) and [`xml2json`](https://www.npmjs.com/package/xml2json)  to parse the feed, and then looped through each episode to get the data. For the shownotes, I needed to covert that back to markdown with [`turndown`](https://www.npmjs.com/package/turndown). I also learnt about [`padStart/padEnd`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) to pad the episode numbers from `21` to `021`:

```js
'21'.padStart(3, '0') // 021
```

Finally I output all the file names into `filenames.sh` to download all the episodes with `wget` with consistent naming:

```bash
#!/bin/bash
wget http://path.to/file -O 001.mp3
wget http://path.to/file -O 002.mp3
# and so on
```

## Creating new episodes

I'm hosting the episode files on S3 and I didn't want to have to manually get the filesize, duration, and generate a UUID for each episode so I wrote [`new.js`](https://github.com/rknightuk/ruminate/blob/main/scripts/new.js). This script takes an episode number, finds the mp3 file, reads the duration, title, and summary from the mp3 and outputs a new episode (with a UUID as well). This uses [`mp3-duration`](https://www.npmjs.com/package/mp3-duration) and [`node-id3`](https://www.npmjs.com/package/node-id3) to extract that data. I can then fill in the shownotes and push the new episode.

## RSS feed

I was able to replicate [the RSS feed](https://ruminatepodcast.com/feed.xml) from Simplecast with this new setup but for some reason Safari doesn't auto-recognise it as a feed that can be opened in Podcasts/NetNewsWire. If anyone knows what attribute triggers this, I'd love to know.

All of the code for this is [on GitHub](https://github.com/rknightuk/ruminate) and you can see see the [new website here](https://ruminatepodcast.com).