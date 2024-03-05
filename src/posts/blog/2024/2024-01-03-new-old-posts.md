---
title: New Old Posts
permalink: /blog/new-old-posts/index.html
date: 2024-01-03T13:31:33.449Z
excerpt: "I dug into the internet archives and imported a shedload of old posts"
layout: post
tags:
    - Apps
    - AppAdvice
    - iPhoneWorldCA
    - Homescreen
---

Yesterday [Chris imported 470 old posts of his](https://chrismcleod.dev/blog/new-year-old-posts/) into his website and I was inspired to do the same.

The earliest posts I could think of were when I was writing reviews of various iPhone apps for iPhoneWorld.ca in 2009. Sadly the site has been offline a long time so I fired up [the internet archive](https://archive.org) and managed to find 14 of those reviews. It's a goldmine of glorious pre-iOS7 design, check out all the posts with the [#iPhoneWorldCA](https://rknight.me/blog/tags/iphoneworldca/) tag.

![iPhone 3GS homescreen](https://cdn.rknight.me/site/iphone-3gs.png)

After that I wrote for a while for [AppAdvice](https://appadvice.com) which _does_ still exist but all my reviews are gone. Thankfully I had archived the 15 reviews previously which you can view on the [#AppAdvice](https://rknight.me/blog/tags/appadvice/) tag.

Deep in my computer archives I found a Tumblr backup from 2010. Most of these posts were just link posts and basically all of the links were dead. I did manage to save a few posts though:[^1]

- [6 Things I want in OS 4.0](https://rknight.me/blog/6-things-i-want-in-os4/)
- [My Top Five Bookmarklets](https://rknight.me/blog/my-top-five-bookmarklets/)
- [6 Things I want in OS 4.0 [Updated]](https://rknight.me/blog/6-things-i-want-in-os4-updated/)
- [Quick Tip: Rotate Photos in Evernote](https://rknight.me/blog/quick-tip-rotate-photos-in-evernote/)
- [My Home Screen (January 2010)](https://rknight.me/blog/my-home-screen-january-2010/)

Finally I found an old version of this site which had a lot of posts from 2010 and 2011 that weren't here for some reason, so that added another 82 posts.

I updated my `postsForFeed` collection in Eleventy so that posts older than 2013 won't show up and spam everyone's feed reader[^2]:

```js
postsForFeed: (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/blog/**/*.md").reverse().filter(p => {
        return moment(p.date).isAfter(moment('2012-12-12'))
    })
}
```

None of these posts are particularly exciting but I want to keep as much of it as I can online. As far as I know, this site now contains every article I've ever written.


[^1]: lol Evernote
[^2]: Not a dig at you, Chris. More of a "thank fuck someone else did it first"