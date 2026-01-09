---
title: EchoFeed Updates
permalink: /blog/echofeed-updates/index.html
date: 2024-11-25T14:16:31.000Z
excerpt: "A list of the changes I've made to EchoFeed in the past few months"
tags:
    - Development
    - EchoFeed
project: https://echofeed.app
repost: This post originally appeared on the now-removed EchoFeed blog
---

It's been a while since I've posted here for a couple of reasons. The first, is that I've had some problems with EchoFeed just kind of stopping work every couple of weeks. I've moved to a much bigger server which has solved the issues but this was stopping me from adding new features while I fought stupid server fires. The second is that lots of the changes have been smaller things in the background that don't justify a blog post. Having said that, here's the changelog from the past few months:

- Added support for webp uploading
- Fixed bug with identifying JSON feeds
- Added `word_count` variable
- If the Echo doesn't include a link variable and it needs to be truncated, it won't link back to the post any more
- Added support for custom PDS endpoint for Bluesky
- Bluesky now includes open graph images where appropriate
- Multiple smaller bugs not big enough to include in a changelog

Mastodon and Bluesky both support setting a language for a post so that people can filter posts to only those they want to see (or for searching and so forth). EchoFeed now supports the language option for both services. You'll see the option when editing existing echoes or creating a new one.

![Language dropdown for Mastodon and Bluesky on EchoFeed](https://cdn.rknight.me/echofeed/language.jpg)

I am actively working on filters ("if content contains X don't send") and template logic (handlbars support) as well as getting Threads support out of beta.

EchoFeed is also now on the fediverse at [@echofeed@hub.7622.me](https://hub.7622.me/@echofeed) and on Bluesky at [@echofeed.app](http://bsky.app/profile/echofeed.app) if you're into that sort of thing.
