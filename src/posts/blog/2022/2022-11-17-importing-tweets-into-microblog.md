---
title: Importing Tweets into Micro.blog
permalink: /blog/importing-tweets-into-microblog/index.html
date: 2022-11-17T00:00:00.000Z
excerpt: "A script to import tweets from your tweet archive to Micro.blog"
tags:
    - SocialMedia
    - Development
---

I wanted to import a bunch of tweets from my archive (mostly cat photos and a few other bits) but I didn't want to have to manually go through each tweet, copy the text and download the photos. So I wrote a script to do it for me once I had the IDs (which I got with my [Safari shortcut](https://rknight.me/get-safari-tabs-shortcut/)).

One thing that had annoyed me for a while is I didn't keep a diary/note of things that happened and my thoughts during the first year of so of the pandemic but thanks to going through my archive I now [have that](https://toot.rknight.me/categories/covid/). On a cheerier note I have a lovely collection of animals in the [pets category](https://toot.rknight.me/categories/pets/). These additional categories were done manually (with the help of [QLMarkdown](https://github.com/sbarex/QLMarkdown)) as I couldn't think of a way to automate this.

Once I had the IDs it was a case of getting the format correctly (for example, Micro.blog will fail an import with empty categories in the YAML). I was able to take ~450 tweets, convert them to markdown and [import them into Micro.blog](https://toot.rknight.me/categories/imported-tweets/). For example, this tweet:

![](https://cdn.rknight.me/site/boristweet.png)

becomes:

```
---
date: 2022-10-20T13:56:19+00:00
categories: Imported Tweets
---

"You could not live with your own failure. Where did that bring you? Back to me"

![](https://pbs.twimg.com/media/Ffg6jkDXkAARD4p.jpg)
```

The script isn't perfect. It doesn't do anything with hashtags or usernames, nor does it check if a tweet is a reply or a retweet. The [project readme.md](https://github.com/rknightuk/twitter-to-micro-blog) has steps for using it on your own archive.
