---
title: "Mastodon Webmentions and Privacy"
permalink: /blog/mastodon-webmentions-and-privacy/index.html
date: 2024-02-10T16:36:01.450Z
excerpt: "Some thoughts on the privacy implications of doing Mastodon-based webmentions"
tags:
    - ActivityPub
    - Development
    - OpenWeb
---

Wouter's post about [retiring their webmention server](https://brainbaking.com/post/2023/05/why-i-retired-my-webmention-server/) is an interesting write-up on how complicated webmentions and indieweb functionality in general can be but one point from it has stuck with me since reading it:

> ...people mentioning or replying to your link via Twitter suddenly appear as a mention on your site. Great stuff, right? Except those people have no idea their avatar and text is being yanked. I’ve questioned these practices before and it’s clear that they’re built without thinking too hard about privacy.

Until this point I also hadn't considered the privacy aspect of using webmentions like this. Assume someone, `@userX` for example, replies to one of my toots about a post I've written. Bridgy will pull in that reply with the avatar, username, and the reply content for me to display on that post as a reply. As it's setup right now, that reply will live forever on my post regardless of what `@userX` does with their original version of the reply. Should I be periodically checking if a reply has been deleted (or edited for that matter)? In theory, that could be hundreds or thousands of links to check.

Secondly, not everyone even _knows_ that this is happening when they reply to a toot where the site owner has webmentions enabled. Should there be some extra step to say "Are you happy for this to show up on this post"? That seems like a good way to kill the whole concept but maybe we should? I don't know.

Yes the replies are set as "public" (or at least I think Bridgy only picks up public ones) but public doesn't mean "do whatever you want and copy it forever".

For all the effort that's been [put into making webmentions work](https://11tybundle.dev/categories/webmentions/) I'm now wondering if I should even be doing it. I certainly wouldn't want anyone to feel like their posts are being taken without their permission or used in a way they never intended.