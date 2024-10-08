---
title: "Setting Up Mastodon Author Tags"
permalink: /blog/setting-up-mastodon-author-tags/index.html
date: 2024-10-08T19:45:42.172Z
excerpt: "How to setup your website so you too can have a fancy author tag when your posts are shared"
layout: post
tags:
    - ActivityPub
    - Development
---

![The new author tags on Mastodon 4.3](https://cdn.rknight.me/site/author-tag-preview.jpg)

[Mastodon 4.3 released today](https://blog.joinmastodon.org/2024/10/mastodon-4.3/) with a bunch of features but the one most people, including me, are excited about is author tags - this isn't the name of them but they also don't seem to have a proper name as far as I can tell. Anyway, you need to do two things to get the "More from X" section you can see in the screenshot above. The first is to add the `fediverse:creator` tag to your site in your `head`, which I [previously wrote about here](https://rknight.me/blog/highlighting-journalism-with-the-fediverse-creator-tag/).

```html
<meta name="fediverse:creator" content="@robb@social.lol" />
```

Then you need to jump into your settings on Mastodon and go to the Author Attribution section under Public Profile > Verification. Add the domain(s) that you want to allow to be linked to your profile. 

![The author attribution section of Mastodon](https://cdn.rknight.me/site/author-tags-settings.jpg)


And that's it. Keep in mind if you share a post to test this that has been posted recently your instance probably has it cached so the new author stuff won't show up.