---
title: "On Transient Slash Pages"
permalink: /blog/on-transient-slash-pages/index.html
date: 2025-01-13T22:11:53.138Z
excerpt: "Thinking too much about slash pages again"
tags:
    - Development
    - OpenWeb
---

A couple of weeks ago [Chris said this about slash pages](https://chriscoyier.net/2025/01/04/slash-pages/):

> I think it makes more sense to me to write about what I carry around _right now_ and if I did it again later, it doesn’t have to replace what I’ve written before

[Slash Pages](https://slashpages.net) is a site I maintain that is a "_guide to common pages you can add to your website_". So `/uses`, `/now`, and so on. Chris' quote above was about `/edc` but it applies to all of them. It was also discussed on [episode 647 of ShopTalk](https://shoptalkshow.com/647/).

My post on [automating my /now page](https://rknight.me/blog/automating-my-now-page/) was very popular and I am proud of what I managed to do but I've been thinking for a while it's very impersonal. It's _data_. It's not a page written by me in any meaningful way.

[Leon had](https://lmika.org/2025/01/14/on-slash-pages-verses-blog.html) some similar thoughts on this with an idea for each blog post being a section of a page but rendered as one. The end goal for him, and me, is that the new additions get syndicated via RSS, POSSE, and so forth. I like the idea of redirecting `/now` to the latest post tagged as `now` so one could see the latest version of what I'm doing now.

For a `/now` page, this makes a lot of sense - on a regular schedule I can add a new post about what I'm up to and update things as required but when thinking about [my /uses page](/uses), what does an update to that look like? Assuming a short `/uses` page like this:

```txt
- MacBook Pro
- AirPods Max
- iPhone 14 Pro
```

The _first_ blog post is easy, it would include all of that but if I change my phone to a 16 Pro do I duplicate the whole thing but update just that one line? If I just post a diff of what's changed then there isn't a single place to see everything I've used. 

I'm going to start with my `/now` page while I mull over how to handle some others.

