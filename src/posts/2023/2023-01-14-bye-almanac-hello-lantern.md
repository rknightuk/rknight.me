---
title: Bye Almanac, Hello Lantern
permalink: /blog/bye-almanac-hello-lantern/index.html
date: 2023-01-14
excerpt: "Retiring my media blogging engine Almanac and launching it's spirtual successor Lantern"
layout: post
tags:
  - Development
  - Games
  - TV
  - Movies
  - OpenWeb
---

I am a hoarder of data. I have exports from dead Tumblr sites, Twitter accounts,  Pinboard, Instapaper, and probably more I'm not thinking of. I also like to be able to check when I did something, watched something, or just tweeted something funny (it happened [at least once](https://hellsite.rknight.me/656762307494682624/)).

### Bye Almanac

In February 2015 [I started using](https://hellsite.rknight.me/569782414899355648/) [Plot](http://plotapp.io/) (RIP) for tracking movies I've watched. This was before I'd heard of [Letterboxd](https://letterboxd.com/) and before the proliferation of the many TV and movie tracking apps on iOS. Within a few months I decided I wanted the same for TV shows I'd watched and games I played so I started work on the first version of Almanac. I built this with [Eleventy](https://www.11ty.dev/) which worked well but was missing any kind of search and I couldn't post from my phone (I suppose I could but I _hate_ doing things on my phone). Sadly I don't have a copy of this version of site but I do have this rather natty screenshot of it:

![A screenshot of version one of Almanac](https://rknightuk.s3.amazonaws.com/site/almanac-screenshot.png)

Fast forward to 2018 and I did the [first commit](https://github.com/rknightuk/almanac/commit/2595bc622f75ef5ddc9a85cd745dd216b69fbddc) on version two. This version was built on Laravel for the backend and a React front end. It used the [TMDB API](https://www.themoviedb.org/) for movies and TV, and the [GiantBomb API](https://www.giantbomb.com/api/) for games. I built a [Letterboxd importer](https://github.com/rknightuk/almanac/blob/master/app/LetterboxdFetcher.php) to poll my profile RSS feed to grab new reviews and store them in Almanac, kept track of how many times I'd watched a movie, and more recently used it to cross-post Letterboxd reviews to Micro.blog. This has now been replaced with [Echo](https://echo.rknight.me).

When I started using Micro.blog early last year I realised it made no sense to have all these different places I was posting things so I spent some time exporting the ~1200 posts from Almanac and importing them into Micro.blog. Since then I've been posting directly to Micro.blog, with the exception of movies which are still fed in from Letterboxd. For the sake of posterity, here's a couple of screenshots of Almanac as it exists now:

![A screenshot of the front end of Almanac](https://rknightuk.s3.amazonaws.com/site/almanac-screenshot-1.png)

![A screenshot of the backend of Almanac](https://rknightuk.s3.amazonaws.com/site/almanac-screenshot-4.png)

### Hello Lantern

Like version one of Almanac, I've missed being able to quickly search for a movie or TV show to grab the year or link when posting to Micro.blog. Which is why I built [Lantern](https://lantern.rknight.me). Lantern uses the same APIs as Almanac (and even shares some of the same design for search). It grabs the year (release or first aired) as well as the poster and converts it to Markdown for posting to Micro.blog. Of course it also pops the [discover emoji](https://help.micro.blog/t/emoji-in-discover/34) in there too.

![Lantern screenshot](https://rknightuk.s3.amazonaws.com/site/lantern-screenshot.png)

I started with a version that logged you in and would post automatically but realised that made it more complicated that it needs to be. I switched it over to use [Netlify functions](https://www.netlify.com/products/functions/) for the API and a mess of vanilla JS for the front end. Micro.blog has the posting UI so I just needed to generated the main content. Micro.blog already has book support so I don't think I'll be adding too many features to Lantern but please let me know if you find any bugs or you have any litte requests.
