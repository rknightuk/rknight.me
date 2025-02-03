---
title: Please, Expose your RSS
permalink: /blog/please-expose-your-rss/index.html
date: 2023-11-06T13:11:20.440Z
excerpt: "I noticed a lot of people don't have a link to their RSS feeds on their sites or have the correct metadata for auto-discovery"
tags:
  - OpenWeb
  - Development
discuss:
- type: HackerNews
  link: https://news.ycombinator.com/item?id=38595855
  date: 2023-12-10T22:52:55
featured: true
---

Earlier this week I had a need to manually find a bunch of people's RSS feed links. It seemed simple enough: go to their website and look for an RSS/Subscribe link but I was surprised to find that a lot of people don't have a link anywhere to their feed.

Even if people only ever add your website into their feed reader and let the app find the RSS feed (see below for more info on this), showing an RSS link reminds people that RSS exists, a win for the open web.

My second step when finding a link failed was to use this handy JS snippet from my [Podcast Duration project](https://podduration.rknight.me):

```js
return Array.from(document.getElementsByTagName('link')).find(l => l.type.includes('application/rss+xml'))?.href
```

This looks for a `<link>` tag on the website that has a type of `application/rss+xml`. This is called RSS auto-discovery and is a standard way to expose RSS feeds to help [browsers and other software to automatically find a site's RSS feed](https://www.rssboard.org/rss-autodiscovery).

Like the standard link, a lot of sites were also missing this. This is (at least as a first step) what feed reeders like [NetNewsWire](https://netnewswire.com) will use to automatically find a feed when you paste in a URL. If you have an RSS feed, you should have the following in the `head` of your website:

```html
<link rel="alternate" type="application/rss+xml" title="My Cool Website" href="https://example.com/feed.xml" />

<!-- use application/atom+xml for an atom feed -->
<link rel="alternate" type="application/atom+xml" title="My Cool Website" href="https://example.com/atom.xml" />
```

If you have multiple feeds, you can have more than one `link` tag that links to those feeds as well. For example, say you have a [JSON feed](https://www.jsonfeed.org) and a podcast feed you want to link to:

```html
<!-- Website RSS feed -->
<link rel="alternate" type="application/rss+xml" title="My Cool Website" href="https://example.com/feed.xml" />

<!-- Website JSON feed -->
<link rel="alternate" type="application/json" title="My Cool Website but JSON" href="https://example.com/feed.json" />

<!-- Podcast RSS feed -->
<link rel="alternate" type="application/rss+xml" title="My Cool Podcast" href="https://example.com/podcast.xml" />
```

Please, expose your RSS.

Update 2023-12-09 via [James](https://bne.social/@james/111545470669286673):

> if you're going to add an RSS button, please ensure it looks like an RSS button and is in RSS orange

This is an excellent idea and I have done so here.