---
title: "We Need to Talk About Your Eleventy Post Dates"
permalink: /blog/eleventy-post-dates/index.html
date: 2024-03-14T15:14:14.578Z
excerpt: ""
layout: post
tags:
    - Development
    - Eleventy
---

Since I really got back into following RSS feeds in the past couple of years I've noticed a problem with Eleventy sites[^1] and post dates. This also caused me an issue while building [EchoFeed](https://echofeed.app) but that's a story for another day. If I didn't know better I'd think everyone is scheduling their posts at midnight.

It's 3:15pm as I write this. Assume you create a post in Eleventy and set some frontmatter like so:

```md
---
title: We Need to Talk About Your Eleventy Post Dates
date: 2024-03-14
---
```

So the date is today and the title is `We Need to Talk About Your Eleventy Post Dates`. You finish up the actual post, deploy your site, and you're done. Then it shows up in my RSS reader but it looks like this:

![A post as it shows in the RSS feed](https://cdn.rknight.me/site/post-date.jpg)

Notice it says midnight as the time. This is because we didn't include a time with the `date`. This isn't a problem in isolation unless you happen to be a multiple-posts-a-day kind of person but if this is posted at 15:15 and I check my RSS reader for posts made today right after it's posted for the first time that day, this post is actually at the bottom of all the posts.

I'm guilty of this too - any of my posts prior to 2021ish all have no time specified. New posts since then have the date set in the metadata in ISO format:

```md
date: 2024-03-14T15:14:14.578Z
```

Maybe you don't care about this which I totally get but I also think there might be some people who didn't even realise this was happening with their posts.

Update: this is also explained in more detail [on the Eleventy docs](https://www.11ty.dev/docs/dates/#dates-off-by-one-day).

[^1]: This might also be a problem with other static site generators but I didn't check
