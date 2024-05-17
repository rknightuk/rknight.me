---
title: "My Blogging Workflow"
permalink: /blog/my-blogging-workflow/index.html
date: 2024-05-17T07:54:40.317Z
excerpt: "How I use Obsidian, VSCode, and Eleventy to write for my website...for now."
layout: post
tags:
    - Eleventy
    - WeblogPoMo
---

[Heiji asked what my blogging workflow is](https://mastodon.social/@Heiji/112434376144010436) and I thought not only is it an interesting idea for a post, but also can serve as a blueprint for how I want [my new CMS](https://rknight.me/blog/my-perfect-cms/) to work.

### Post Types

I have four types of posts on my site:

- [Blog posts](/blog) - titled, usually long-form, posts like this one
- [Links](/links) - Links to interesting articles usually with a quote and comment
- [Almanac](/almanac) - My media blog for books, movies, tv shows, and games
- [Notes](/notes) - This one is new and I'm not using it yet but it's going to be for shorter, title-less micro blogging

There's also [the changelog](/log) but that's updated much less. For all of these, because the site uses [Eleventy](https://11ty.dev), I have to commit and push to GitHub.

#### Blog Posts

I usually write a draft in Obsidian either on my phone or Mac then, if I want someone to eyeball it and give feedback, I'll post the draft to a private paste on [paste.lol](https://paste.lol). Once I'm happy with it I'll create a new post in my site's repository, paste over the content, add an excerpt, and run Eleventy locally to check everything looks okay. Then I commit and push it to GitHub.

To create a new post on my Mac, I use the CLI tool I made which handles all this. I run `npm run cli` in the terminal, choose "Create a new post", set the title and tags, and the CLI creates a new file in the right place. 

![The custom CLI for my site](https://cdn.rknight.me/site/site-cli.jpg)

It also handles adding new games and projects, as well as fetching my Lego and comics collections when I've added new things. [You can see the code for the CLI here](https://github.com/rknightuk/rknight.me/blob/master/cli/index.js).

So how do I create posts when I'm not at my Mac? I don't. This is why I need a CMS.
#### Links

These are harder to do manually because I like to get a lot of metadata for a link post. As an example here's the contents of the latest link post file. I get the authors name, RSS feed, and Mastodon handle as well as the link title and URL:

```md
---
title: "Would You Recommend Us to Your Friends?"
permalink: /links/would-you-recommend-us-to-your-friends/index.html
link: https://starbreaker.org/blog/rants/would-you-recommend-us-to-your-friends/index.html
date: 2024-05-08T13:48:10.335Z
author: 
  name: Starbreaker
  web: https://starbreaker.org
  feed: https://starbreaker.org/feeds/everything.xml
  mastodon: https://social.lol/@starbreaker
---

> Whether or not I would recommend your business is none of your business. Who the fuck are you to even ask this question of your customers?

Amen. Fuck right off with all this.
```

I have [a bookmarklet](https://github.com/rknightuk/rknight.me/blob/master/src/assets/bookmarklets/new-link.js) that I use which collects all this data and redirects me to a new file page on GitHub. To build this bookmarklet, I use [this script](https://github.com/rknightuk/rknight.me/blob/master/scripts/bookmarklets.js) to bundle them and pop them on [the bookmarklets page](/bookmarklets). Once I'm on the GitHub editor I can edit or add my comments then commit the file.

#### Almanac

For movies, I use [Letterboxd](https://letterboxd.com/rknightuk/) and the GitHub service on [EchoFeed](https://echofeed.app) to take new reviews and add a new post to the GitHub repository. The echo config looks like this:

```js
---{% raw %}
title: "{{ custom.letterboxd.filmTitle }}"
year: {{ custom.letterboxd.filmYear }}
date: {{ datetime:iso_full }}
permalink: /almanac/movies/{{ date:iso }}-{{ title:slug }}/index.html
link: {{ link }}
---

{{ content:plain }}{% endraw %}
```

And you can see an example of [a post made this way here](https://rknight.me/almanac/movies/2024-02-16-the-super-mario-bros-movie/).

For TV, games, and books this is a manual process. I create a new post in the correct folder (in this case, `src/posts/almanac/2024`), add the metadata I need and commit it. There's no media lookup, or pulling of the cover/poster, which I would like to include - a handy CMS feature I'll be building.
#### Notes

The plan for this one, and one of the big reasons I want a proper CMS, is to replace a lot of my posting directly onto Mastodon with actual posts on my site. I [did do a test post](https://rknight.me/notes/202405121229/) and [it worked](https://social.lol/@robb/112428263546671473) so that's a good start.
### Cross-Posting

You might have noticed I didn't mention cross-posting for the last three post types and that's because they all use the same system: a custom JSON feed extension and EchoFeed. For blog posts, I always post these myself to Mastodon.

If you look [at the links JSON feed](https://rknight.me/subscribe/links/feed.json) you'll see an object for each post that looks like this:

```json
"_knightposse": {
	"about": "https://rknight.me/about/colophon/",
	"text": "Would You Recommend Us to Your Friends? by @starbreaker@social.lol https://starbreaker.org/blog/rants/would-you-recommend-us-to-your-friends/index.html\n\n\"Whether or not I would recommend your business is none of your business. Who the fuck are you to even ask this question of your customers?\"\n\nAmen. Fuck right off with all this.\n\nðŸ“Œ https://rknight.me/links/would-you-recommend-us-to-your-friends/",
	"tags": [],
},
```

This allows me, in EchoFeed, to use {% raw %}`{{ custom._knightposse.text }}`{% endraw %} in my config and control what gets posted from my site. For link posts, I mention the author's Mastodon handle if I have it. If there's a blockquote in the post, I'll convert it to have quotes around it when it goes to Mastodon. All of this is done in the `makeTootText` filter of my Eleventy config.

One of the hard parts of cross-posting to Mastodon (or Bluesky, or Twitter) is the character limits. Mastodon, by default, limits to 500 characters so I needed to find a way to handle that.

If you want to look the code in full, you can see that [here in my filters file](https://github.com/rknightuk/rknight.me/blob/master/config/filters.js). The core of it is checking the length of the output and if it's two long, falling back to shorter versions. For link posts, first I check if all the text (title, mention, quotes, comments) can fit in the limit. If it doesn't, I fall back to just the title, mention, and quote. Finally if that doesn't work, I fall back to just the title, mention, and link - which is unlikely to go over the limit unless for some reason I use a _very_ long title.

```js
if (mastodonCount.getMastodonLength(contentWithAllText).length <= 500)
{
	content = contentWithAllText
} else if (mastodonCount.getMastodonLength(contentWithFirstQuote).length <= 500)
{
	content = contentWithFirstQuote
} else {
	content = `${content}\n\n📌 ${permalink}`
}

return content
```

To find out the length, you can't just check the length of the string - links are always counted as 23 characters and only the first part of the username is counted `@robb`, the domain is ignored (`@social.lol`). That is what `getMastodonLength` is doing with [some wild regex I borrowed](https://github.com/rknightuk/rknight.me/blob/master/config/mastodonCounter.js) directly from Mastodon itself. 

As an example, the previous link post I mentioned above gets posted to Mastodon like this:

> ⭐ Would You Recommend Us to Your Friends? by [@starbreaker](https://social.lol/@starbreaker) [https://starbreaker.org/blog/rants/would-you-recommend-us-to-your-friends/index.html](https://starbreaker.org/blog/rants/would-you-recommend-us-to-your-friends/index.html)
>
> "Whether or not I would recommend your business is none of your business. Who the fuck are you to even ask this question of your customers?"
>
> Amen. Fuck right off with all this.
>
> 📌 [https://rknight.me/links/would-you-recommend-us-to-your-friends/](https://rknight.me/links/would-you-recommend-us-to-your-friends/)

### The CMS

The CMS that I'm imagining would ideally allow me to do all of this stuff from anywhere I have internet access.

For links, automatically pull in the author details. For almanac, have media data lookup. For blog posts and notes, the ability to post from anywhere. Load my following list so I can mention people on Mastodon.

I guess I should start building it really.