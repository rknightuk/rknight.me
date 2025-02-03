---
title: "What Even is a Webmention?"
permalink: /blog/what-even-is-a-webmention/index.html
date: 2024-01-20T16:11:08.976Z
excerpt: "In which I try to explain what a \"real\" webmention is compared to a Mastodon \"webmention\""
tags:
    - Development
    - OpenWeb
---

My post about [implementing webmentions on this site](https://rknight.me/blog/adding-webmentions-to-your-site/) has been fairly popular and I get quite a few questions about something I don't think I explained properly in the post which all boil down to "what _is_ a webmention though and what has that got to do with Mastodon?".

Before we get started I will say I found the different pages explaining the technical details of webmentions to be lacking in terms of real-world use cases so I am basing this on what I can piece together from those sites.

### "Real" Webmentions

A webmention is "_a simple way to notify any URL when you link to it from your site._". The use of "simple" here is stretching the definition but it does at least explain what they are, sort of. There are different types of webmentions but the one typically used by a website is `mention-of`. Basically, "_I wrote this post and I have mentioned your or your website in it_". These need to be sent from the poster to the website being mentioned. For my site I use the CLI version of [webmention.app](https://webmention.app); each time a new post appears in my RSS feed, I use the command line package to send mentions to any supported site that I've included in the post:

```bash
npx webmention path/to/feed.xml --limit 1 --send
```

You might be thinking I'd link to an example of one of these types of webmentions on my site but I don't show them. I checked my webmentions for this type and out of the ~40 or so that were there, only a handful were actually legitimate, the rest were either now-dead sites or spam. If I can come up with a system for approving them in the future, I will add them to the site. The open nature of webmentions means there's very little to stop someone from sending spam webmentions. These can be blocked in webmention.io but I would never remember to do that. I also had two `bookmark-of` webmentions but both of those links were dead and I don't know what type of post they should refer to. 

I do get _some_ legitimate ones though so here is an example of one from [Sophie](https://localghost.dev), truncated for the sake of legibility:

```js
{
    "type": "entry",
    "author": {
        // author info
    },
    "url": "https://localghost.dev/blog/everything-should-have-an-api-adventures-in-trying-to-automate-stuff/",
    "published": "2023-01-24T00:00:00",
    "wm-received": "2024-01-19T20:43:30Z",
    "wm-id": 1769280,
    "wm-source": "https://localghost.dev/blog/everything-should-have-an-api-adventures-in-trying-to-automate-stuff/",
    "wm-target": "https://rknight.me/automating-my-now-page/",
    "wm-protocol": "webmention",
    "name": "Everything should have an API: adventures in trying to automate stuff",
    "content": {
        "html": "<p>Inspired by <a href=\"https://rknight.me/automating-my-now-page/\">Robb Knight</a> I want to build my own <a href=\"https://nownownow.com/about\">/now page</a>..."
    },
    "mention-of": "https://rknight.me/automating-my-now-page/",
    "wm-property": "mention-of",
    "wm-private": false
}
```

Notice it has the type of `mention-of` and the URL for [the post I'm being mentioned in](https://localghost.dev/blog/everything-should-have-an-api-adventures-in-trying-to-automate-stuff/).

Based on my understanding, there no reason you _couldn't_ send a webmention about a post you've written as a reply or repost type but I haven't seen this being used, outside of how Bridgy converts Mastodon interactions.

### Mastodon "Webmentions"

Calling what I show at the bottom of my blog posts "webmentions" is a bit misleading because they're actually posts, likes, and boosts _from Mastodon_; nothing to do with webmentions.

What's actually happening is those interactions are being _converted_ to webmentions by [Brid.gy](https://brid.gy) which then forwards them on to webmention.io. As an example [this toot on Mastodon from Zach](https://fediverse.zachleat.com/@zachleat/109780757249677343) is a reply to [my toot](https://social.lol/@robb/109780686521180648) which includes a link to one of my blog posts. Bridgy will see this reply and convert it to a webmention of the type `in-reply-to`:

```js
{
    "type": "entry",
    "author": {
        "type": "card",
        "name": "Zach Leatherman :11ty:",
        "photo": "https://webmention.io/avatar/media.social.lol/f4e48698b4079b12cff61448419d6cf2a13293b27bdaa0a551de22a70e402f70.png",
        "url": "https://fediverse.zachleat.com/@zachleat"
    },
    "url": "https://fediverse.zachleat.com/@zachleat/109780757249677343",
    "published": "2023-01-30T23:30:17",
    "wm-received": "2023-01-30T23:48:08Z",
    "wm-id": 1611442,
    "wm-source": "https://brid.gy/comment/mastodon/@robb@social.lol/109780686521180648/109780761774871086",
    "wm-target": "https://rknight.me/adding-webmentions-to-your-site/",
    "content": {
        "html": "<p><span class=\"h-card\"><a href=\"https://social.lol/@robb\" class=\"u-url\">@<span>robb</span></a></span> awesome!</p>",
        "text": "@robb awesome!"
    },
    "in-reply-to": "https://rknight.me/adding-webmentions-to-your-site/",
    "wm-property": "in-reply-to",
    "wm-private": false
}
```

You can see it has a `target` attribute which is my blog post, the details of the author of the toot, as well as some other metadata including the `in-reply-to` type. The same thing will happen for likes (`like-of`) and boosts (`repost-of`). I then use this to show this at the bottom of my posts.

What Bridgy doesn't do, and I'm not even sure how this could work given the federated nature of Mastdon, is pull in a toot from _someone else_ posting a link to one of my posts. In theory, I could monitor the [federated feed of social.lol](https://social.lol/public) and see if something pops up but it's not guaranteed to find all, if any, mentions.

### Shouldn't all this be easier?

If you've read [my post](https://rknight.me/blog/adding-webmentions-to-your-site/), or [Cory's post](https://coryd.dev/posts/2023/webmentions-in-eleventy/), or one of the [many other posts about webmentions in Eleventy](https://11tybundle.dev/categories/webmentions/) you'll know this isn't as simple or easy as it should be.

First off given how few "real" webmentions I have, I'm tempted to skip that part entirely and just pull Mastodon interactions directly. I'm not a fan of relying on other services that I don't control so this would solve that for me. I haven't looked at the API too much for this, but I can't imagine it would be _too_ difficult[^1].

Secondly, to my point above about relying on other services, I've yet to see a good implementation of something that can be easily self-hosted. I want to explore that a more in the future. Let me know if there is something you're aware of.

As for _sending_ webmentions I could imagine a service for sending webmentions where you just point your RSS feed at it and it deals with sending webmentions for you, rather than using something like webmention.app which is _very_ good but either requires manually entering each blog post, or setting up something on each build of your site; not the most user friendly solution.

[^1]: Famous last words