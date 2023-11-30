---
title: DoubleShift
permalink: /doubleshift/index.html
date: 2023-11-27T22:30:06.509Z
excerpt: "A small idea to check how many actors have been in both Scrubs and Grey's Anatomy turned into a much bigger thing"
layout: post
tags:
    - Eleventy
    - TV
    - Development
---

I have watched [Scrubs](https://www.themoviedb.org/tv/4556-scrubs) more times than I can count and I am currently re-watching [Grey's Anatomy](https://www.themoviedb.org/tv/1416-grey-s-anatomy) for the third (maybe fourth?) time. I noticed there are a lot of actors who have appeared in both and it _seemed_ like it was every other episode. After some data-wrangling I have an actual answer: 28 actors have appeared in both series.

### The Idea

I thought it would be fun to show this on a site along with highlighting what I'm calling "double doctors": that is, actors who have played a doctor in both shows. The site is called [DoubleShift](https://doubleshift.rknight.me) and it has this nifty logo I whipped up:

[![DoubleShift logo](https://rknightuk.s3.amazonaws.com/site/double-shift-logo.png)](https://doubleshift.rknight.me)


I mentioned this idea to [David](https://mas.to/@_dreaves) and he asked what the numbers were like against [House](https://www.themoviedb.org/tv/1408-house). So I added House to my dataset: 78 actors have appeared in Grey's and House, and 48 have appeared in Scrubs and House. I also added [ER](https://www.themoviedb.org/tv/4588-er?language=en-GB) because that had a lot of crossover too.

I briefly added General Hospital because of how long it has been running but there was [just one actress](https://www.themoviedb.org/person/36216-cynthia-watros) who has been in any of the other shows so I removed it again. Also, adding even one more show generates so many more permutations. 

### Handling the Data

To fetch the actor data for each show I used [The Movie Database API](https://developer.themoviedb.org/reference/intro/getting-started) which has a handy "Aggregate Credits" endpoint for fetching all actors who have been in a show across all seasons. I then mapped that data to a keyed object by their TMDB ID:

```js
const res = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/aggregate_credits?&series_id=1416&language=en-US`, {
	headers: {
		'Authorization': `Bearer ${process.env.API_KEY}`,
		'accept': 'application/json'
	}
})
const json = await res.json()
const data = {}

json.cast.forEach((actor) => {
	data[actor.id] = {
		...actor,
	}
})
```

To find the actors who have been in both shows a `filter` did the trick:

```js
const intersection = Object.keys(showData[showOne]).filter(element => Object.keys(showData[showTwo]).includes(element))

// console.log(intersection)
// [123, 3456, 3456]
```

I used [Eleventy](https://11ty.dev) like I always do because it's data files are perfect at handling this kind of thing and using nunjucks is easy-peasy to output what I want. I decided to avoid using javascript on the site itself here so I used CSS and radio buttons to show and hide each combination of show.

```css
#show-greys-scrubs {
	display: none;
}

#greys-scrubs:checked ~ #show-greys-scrubs {
	display: none;
}
```

It's worth noting that when using the [subsequent-sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator) (`~`) the two elements must be children of the same parent so I couldn't have the radio buttons inside their own container which made styling them slightly harder, but a small price to pay to not rely on JS here.

[View the DoubleShift site here](https://doubleshift.rknight.me) and you can view [the source on GitHub](https://github.com/rknightuk/doubleshift)

- Update 2023-11-28: Added four more shows and leaderboards
- Update 2023-11-30: Check out [Crossover](/crossover) to compare _any_ two TV shows