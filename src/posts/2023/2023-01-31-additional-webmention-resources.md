---
title: Additional Webmention Resources
permalink: /additional-webmention-resources/index.html
date: 2023-01-31
excerpt: "Some more links and tools related to webmentions"
layout: post
tags:
  - OpenWeb
  - Development
  - Eleventy
---

Some more links and tools I've found or had saved about webmentions. Read my post on [adding webmentions here](/adding-webmentions-to-your-site/).

### [@remy/webmention](https://github.com/remy/wm)

Sadly the webapp side of this is [down at the moment](https://remysharp.com/2023/01/30/on-vercel-if-some-of-my-sites-are-down) but the command line tool for _sending_ webmentions is completely standalone.

You can pass the script a url or an RSS feed and it will scan it to find links, confirm those sites accept web mentions, and send those mentions. I ran it once on my whole feed to send any mentions and then added it to my build steps to run it on the latest post:

```bash
npx webmention /path/to/feed.xml --limit 1 --send
```

### [eleventy-plugin-webmentions](https://github.com/CodeFoodPixels/eleventy-plugin-webmentions)

> An eleventy plugin to fetch webmentions and helper methods to display them

Why didn't I look for a plugin when I was doing webmentions? No idea. This is going on my list to review and see if I can streamline my code a bit.

### Links

Some other articles I had saved related to this:

- [How I added Webmentions support to my static website | Ashley Kolodziej - Boston Freelance Web Designer](https://ashleykolodziej.com/add-webmentions-to-static-site/)
- [An In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/)
- [Webmentions for your Static Site | Rowan Manning](https://rowanmanning.com/posts/webmentions-for-your-static-site/)
- [Scheduling Netlify Deployments with Github Actions](https://css-irl.info/scheduling-netlify-deployments-with-github-actions/)
- [Cactus Comments - Federated Web Comments](https://cactus.chat/)
- [Toot toot! Mastodon-powered Blog Comments ⋅ Cassidy James Blaede](https://cassidyjames.com/blog/fediverse-blog-comments-mastodon/)
- [lewis/webmentions - OpenWebmentions - Gitea: Git with a cup of tea](https://git.lewisdale.dev/lewis/webmentions)

