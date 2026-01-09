---
title: EchoFeed and POSSE
permalink: /blog/echofeed-and-posse/index.html
date: 2024-04-24T18:33:06.280Z
excerpt: "What I do, and don't, want EchoFeed to be"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
repost: This post originally appeared on the now-removed EchoFeed blog
---

POSSE is a [an IndieWeb term](https://indieweb.org/POSSE) that stands for "_Publish (on your) Own Site, Syndicate Elsewhere_". It's about owning and controlling what you own instead of dumping it directly into someone else's platform. [I wrote about this before](https://rknight.me/blog/the-web-is-fantastic/) and so did [lots of other people](https://projects.kwon.nyc/internet-is-fun/).

I've had a lot of feature requests for EchoFeed since it launched which I need to consider carefully as to whether I should implement them or not. To do this, on the advice of [Adam](https://neatnik.net), I need to define what I do and don't want EchoFeed to be.

I don't want EchoFeed to be [Zapier](https://zapier.com) or [IFTTT](https://ifttt.com). Those services are great at what they do but they are huge with millions of options. They are very..._enterprise_. Also, they're expensive (for good reason). So despite their similarities of being able to cross-post things, I see EchoFeed as (to merge my own words with [Kev's](https://kevquirk.com/cross-posting-with-echofeed)) **a no-hassle cross-poster for the IndieWeb**. For independent writers to syndicate their posts to social networks. EchoFeed is the (second) `S` in POSSE.

The goal of the syndication part of POSSE is to get your posts in front of more people. It doesn't have to be a complete copy of your post (and I don't recommend that myself), the title, a link back to your blog, and maybe a summary is ideal. Social networks and chat apps like Discord do exactly that. When the Threads API is available, I'll add that as a service to send to. If a new social network comes along that folks are enjoying, I'll do my best to add that as well.

Without a compelling reason, I won't be rushing to add blogging platforms as services. Those are, in most cases, the `P` in POSSE, not the (second) `S`. Micro.blog is the exception here because it's a social network _and_ blogging platform. Also in a lot of cases, blogging platforms tend to have their own RSS post importers available that do the job.

Instead, I'm going to spend my time implementing new features to make EchoFeed better and easier to use.

---

Having said all that, if there is a use case for a new service EchoFeed doesn't support, do let me know and I'll always give proper and reasonable consideration to every suggestion.

