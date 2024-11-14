---
title: "Unorganised Thoughts about BlueSky"
permalink: /blog/unorganised-thoughts-about-bluesky/index.html
date: 2024-11-14T17:05:08.767Z
excerpt: "A collection of random thoughts about Bluesky"
layout: post
tags:
    - ActivityPub
    - OpenWeb
    - SocialMedia
---

These thoughts about Bluesky are unorganised and mostly off-the-cuff so make of that what you will.

The API, even just for posting, strikes me as very strange. I, as the developer, have to mark which things are hashtags, mentions, and links unlike Twitter, Mastodon, and basically every other network. If I want link previews I have to do that too.

The [Personal Data Store](https://github.com/bluesky-social/pds) is interesting. I haven't set one up but [Brandon](https://krrd.ing/posts/setting-up-a-bluesky-pds/) and [Rafael](https://rafaeleyng.github.io/self-hosting-a-bluesky-pds-and-using-your-domain-as-your-handle) did and it seems easy enough but this is just one part of the AT Protocol. Is it possible to host the entire stack yourself without relying on `bsky.social`? Can you be part of the AT Protocol with [a single PHP file](https://gitlab.com/edent/activitypub-single-php-file/)? That might sound stupid but I don't think that's an unreasonable bar to interact with a network even if it's in a limited way.

Starter Packs are a good idea that people seem to like but I would rather people followed me because they've had a gander at what I post and decided to follow. Choosing to follow people en masse without looking at those profiles seems weird to me. The other thing is it feels like they pigeon-hole people into being a specific version of themselves and perhaps give unrealistic expectations to people following[^1]. I feel the same about mastodon instances focused around a specific topic.

I've seen a few people drop Mastodon for Bluesky but I don't really understand why, nothing about it jumps out at me as all that different to Mastodon. You have to go where your people are though so it could just be that. I'm pretty sure Bluesky will get [enshittified](https://en.wikipedia.org/wiki/Enshittification) before too long and everyone will be onto the next thing. 

I am cross-posting my [posts](/posts) and [links](/links) to [my Bluesky account](https://bsky.app/profile/rknight.me) with [EchoFeed](https://echofeed.app). People are there, they presumably followed me to see my things, and I don't lose anything if the service blows up overnight. [POSSE](https://indieweb.org/POSSE), baby.

I setup my own install of [SkyBridge](https://skybridge.fly.dev/) so I can use [Ivory](https://tapbots.com/ivory/) to read my Bluesky timeline because none of the apps are as good as Ivory and probably never will be.

I've updated my [verify page](/verify) to reflect the fact that I am using Bluesky.

[^1]: "Stop posting about politics, stay in your lane"