---
title: "My Perfect CMS"
permalink: /blog/my-perfect-cms/index.html
date: 2024-05-02T07:17:03.000Z
excerpt: "The features of my perfect content management system"
tags:
    - Development
    - WeblogPoMo
---

![What's your perfect CMS?](https://cdn.rknight.me/site/perfect-cms.jpg)

[Matt](https://a.wholelottanothing.org/a-blueprint-of-my-dream-blogging-cms/), then [Dave](https://daverupert.com/2024/04/ideas-for-my-dream-cms/), then [Kev](https://kevquirk.com/what-would-my-dream-cms-be), then [another Dave](https://darn.es/ideas-for-my-dream-cms/), all wrote about what their ideal CMS would be. I don't have as lofty ideals as they do although there's some interesting ideas in there but I do have some things I would like in my perfect CMS and might possibly be doing with a custom-built one in the future.

There are some things that are non-negotiable for me with a CMS so don't require much explanation:

- Markdown support - This is the only way I write. I did my university dissertation in it, I write all my posts in it, I wish I could use it on Mastodon.
- RSS _and_ JSON feeds - I use JSON feeds for querying my site rather than trying to parse XML.
- Attachment uploading to S3/Bunny/whatever

Now onto the more interesting stuff.

### Flexibility

I want to be able to just as easily make a long blog post as I can a title-less short one, or a media entry, or link out to someone else. Tumblr has the perfect flow for this: choose post type > type your stuff > send it out.

### Auto-Linking

I want to type the name of a website (or a movie, or whatever), highlight it, click a button, and the CMS goes and find the link and auto inserts it for me. Exactly how [SearchLink](https://brettterpstra.com/projects/searchlink/) works but not tied to being on my Mac. Dave had an example of this in his post pointing to the way Google Docs does this.

### Media Lookup

I have a [media log](https://rknight.me/almanac) but only movies is automated right now - it comes via Letterboxd to EchoFeed then to GitHub. For TV, Games, and Books I manually type the details myself. Ideally, I want to be able to search for something and have the CMS offer various details like title, year, poster, that I can then insert into my post. Similar to what I built with [Lantern](https://lantern.rknight.me).

### Cross Posting

I built [EchoFeed](https://echofeed.app) because there wasn't a flexible solution for cross posting and it does solve all the things I want to do. Ideally, this would be part of the CMS with options of where to cross post and how that gets posted.

### API Access

I want to be able to build workflows with Alfred, or Raycast, or Shortcuts so I can do a quick post from anywhere without opening the CMS. Or use it for automations to create posts.

Now I've written this out, I'm thinking this will become the outline of the custom CMS I've been meaning to build for a while. Or I could wait for [Neato](https://neato.pub) and see how much that'll do for me.