---
title: "How Long Since I Watched Mean Girls?"
permalink: /blog/how-long-since-i-watched-mean-girls-/index.html
date: 2024-12-26T16:39:00.000Z
excerpt: "I was challenge by Jay to build this during Conduit 91 so I did."
tags: [Development,Podcasting]
---

"When did Robb last watch Mean Girls?" A question that no one except me cares about but here we are, writing about a website I made to answer that one question.

> [!NOTE] TL;DR
> [See the site here](https://meangirls.rknight.me/).

### Why

I built this because during the recording of [episode 91 of Conduit](https://www.relay.fm/conduit/91) I had to come up with a new connection. I _did_ have one prepared, but Jay and I had joked about a website which would check how long it had been since I'd watched Mean Girls. So I made that instead.
### How

I already have this data in [Almanac](https://rknight.me/almanac/) because I obsessively log every movie and TV show I watch. I knew I'd need some kind of endpoint to get this data into the new website and since I already had the infrastructure to easily make new JSON feeds for collections so that's what I did. I added a new collection for any post with a matching Movie DB ID:

```js
almanacMeanGirls: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('almanac/movies')).reverse().filter(p => {          
            return p.data.tmdbid === 10625
        });
    },
```

Then added the new JSON feed to `/api/meangirls.json`.

```js
---
name: Mean Girls
permalink: api/meangirls.json
layout: feed-json
collectionName: almanacMeanGirls
eleventyExcludeFromCollections: true
---
```

Initially I had intended for the new site to be a straight HTML site with a custom build script to insert the data but as with most projects, I ended up adding [Eleventy](https://11ty.dev) to save time.

Ignoring the usual boilerplate (`package.json`, `package-lock.json`, `.gitignore`) the entire source of the site is an index file, a single data file that fetches the RSS feed, and an assets folder with icons, a js file, and fonts in it.

For fonts, I wanted to match the logo from the movie which was easy enough to do - it's [Futura and Futura Extra Bold](https://en.wikipedia.org/wiki/Futura_(typeface)). For the burn book font, I found a handful of "ransom" type fonts but I one I liked the most was [Magazine Letter](https://www.dafont.com/magazine-letter.font). It's missing a lot of symbols but I didn’t need those for this purpose. 

For the "burn book" section I borrowed the border styling from [DoodleCSS](https://chr15m.github.io/DoodleCSS/) which uses an SVG and `border-image` which I don't think I've ever used before. 

For the falling lips I used [`snow-fall`](https://www.zachleat.com/web/snow-fall/). This is also how the idea for [EmojiStorm](https://rknight.me/blog/emojistorm/) came about.

Because this data is coming from a JSON feed I _could_ use [EchoFeed](https://echofeed.app/) to trigger a build but given I only watch this movie every few years, that seemed like overkill. The site does rebuild every day because I didn’t want to use client side JS to show the relative time (e.g. “two days ago”). I’m also considering how to incorporate [the musical version](https://www.themoviedb.org/movie/673593-mean-girls) when I get around to watching that.

[See when I last watched Mean Girls here](https://meangirls.rknight.me/).