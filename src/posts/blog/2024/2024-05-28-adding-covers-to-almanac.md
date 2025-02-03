---
title: "Adding Covers to Almanac"
permalink: /blog/adding-covers-to-almanac/index.html
date: 2024-05-28T08:18:19.492Z
excerpt: "The scripts I used to add posters and covers to my media log entries"
tags:
    - Development
    - Games
    - Movies
    - TV
    - WeblogPoMo
---


![Almanac poster grid](https://cdn.rknight.me/site/almanac-posters.jpg)

[Almanac](/almanac), my media logging blog, has been ported across multiple systems in the past few years. Of the ~1300 posts, some were manually entered, some were done via an API, some were imported from Letterboxd. The data was sporadic at best and I had no posters or covers which after seeing [Pat's watched page](https://patmurray.co/watched/) and [Ste's media page](https://stegrainer.com/media/) I knew I wanted to have. 

### Movies and TV

This is the easiest one. [The Movie DB has an excellent API](https://developer.themoviedb.org/reference/intro/getting-started) that returns a poster, backdrop, description, and release date for each movie (or first air date for TV).

I copied all my movie entries from my blog to a new directory (`poster-fetcher`), initialised npm, installed [`glob`](https://www.npmjs.com/package/glob) and [`nodejs-file-downloader`](https://www.npmjs.com/package/nodejs-file-downloader), added a `movie.js` file, and an `images` directory so I had a structure that looked like this:

```text
/poster-fetcher
├── /images
└── /movies
    ├── /2024
    │   ├── 2024-04-24-spider-man-no-way-home.md
    │   └── ...other movie entries
    ├── package.json
    ├── package-lock.json
    └── movie.js
```

I wanted to achieve two things:

1. Add `tmbdid` to the frontmatter of each post. This can be used the reference the image, and also link to the tmdb page if I want to.
2. Download the poster for the movie to `images/{tmdbid}.jpg`.

The first step was to get all entries, extract the title and year for each one.

```js
import fs from 'fs'
import { glob } from 'glob'
import Downloader from 'nodejs-file-downloader'

const run = async () => {
	// get all .md files from movies
    let files = await glob('movies/**/*.md')

    for (const file of files) {
	    // read file contents
        let content = fs.readFileSync(file, 'utf8')

		// if we've already run it, skip it
        if (content.includes('tmdbid:'))
        {
            continue
        }

		// extract title and year from frontmatter
        const title = content.match(/title: .*/)[0].replace('title: ', '').replaceAll('"', '')
        const year = content.match(/year: .*/)[0].replace('year: ', '')
		
	}
}
```

There was a few posts I had that were missing years so I fixed those up and added the API call to tmdb, then found the first match where the release year was the same:

```js
const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}`, {
	headers: {
		'Authorization': 'Bearer API_KEY',
		'accept': 'application/json'
	}
})

const results = (await res.json()).results

const found = results.find(r => r.release_date && r.release_date.includes(year))

if (!found) {
	// log out missing movies so I can manully fix them
	console.log('No match found for', file)
	continue
}
```

Once I'd found a match, I could then add the tmdbid to the frontmatter of the post, and download the poster to the images directory:

```js
const tmdbId = found.id
const image = `https://image.tmdb.org/t/p/w300${found.poster_path}`

let newContent = content.split('---')
newContent[1] = `${newContent[1]}tmdbid: ${tmdbId}\n`
newContent = newContent.join('---')

// write newContent back to file
fs.writeFileSync(file, newContent)

if (!fs.existsSync('images/' + tmdbId + '.jpg')) {
	// download remote image to images directory and name it as {tmdbId}.jpg
	const downloader = new Downloader({
		url: image,
		directory: './images',
		fileName: `${tmdbId}.jpg`,
	});

	try {
		await downloader.download()
	} catch (error) {
		console.log(error)
	}
}

// set a one second timeout to avoid hitting rate limits
await new Promise(r => setTimeout(r, 1000))
```

So in my most recent entry, the frontmatter now looks like this:

```diff
---
title: "Spider-Man: No Way Home"
year: 2021
date: 2024-04-23T14:04:47.000000Z
permalink: /almanac/movies/2024-04-24-spider-man-no-way-home/index.html
+ tmdbid: 634649
---
```

And the `/images` directory has the poster saved as `634649.jpg`. I did this for all of my movies then moved onto TV. 

The only two changes I needed to make to do it for my TV entries was the API call, and checking `first_air_date` instead of `release_date`.

```diff
- const res = await fetch(`https://api.themoviedb.org/3/search/movie?
+ const res = await fetch(`https://api.themoviedb.org/3/search/tv?
query=${title}`, {
	headers: {
		'Authorization': 'Bearer API_KEY',
		'accept': 'application/json'
	}
})

- const found = results.find(r => r.release_date && r.release_date.includes(year))
+ const found = results.find(r => r.first_air_date && r.first_air_date.includes(year))
```

I did hit an interesting problem with TV. When we used to watch [the Arrowverse shows](https://en.wikipedia.org/wiki/Arrowverse) I would log them [as one entry](https://rknight.me/almanac/tv/2020-07-06-arrowverse-17-18/). So the year and title wouldn't match because there is no show called "Arrowverse". To handle this instead of setting `tmdbid` I set `customImage: 1001` with a number then save a custom image to `images/custom/1001.jpg`. This proved even more useful later on.

I also used `customImage` to set posters for episodes of The Grand Tour that [have their own](https://rknight.me/almanac/tv/2024-05-23-grand-tour/).

### Games

For games, I started with the [RAWG API](https://rawg.io/apidocs), then tried the [igdb API](https://www.igdb.com/api), but ultimately found the [GiantBomb API](https://www.giantbomb.com/api/) to be the best for my needs. I copied `movie.js` and made a `game.js` file, updated the API call and switched to `giantbombid` instead of `tmdbid`. One other difference is instead of using the year of release, I matched on the platform:

```js
const platform = content.match(/platform: .*/)[0].replace('platform: ', '')

const res = await fetch(`https://www.giantbomb.com/api/search/?limit=100&api_key=API_KEY&format=json&query=${title}`)

const results = (await res.json()).results

const found = results.find(r => {
	if (!r.platforms) return false
	const platforms = [...r.platforms.map(p => p.name), ...r.platforms.map(p => p.abbreviation)]
	return platforms.includes(platform)
})
```

Because GiantBomb doesn't appear to have a way to link to a game just based on the ID, I also added `giantbomburl` to the frontmatter of each entry.

```diff
---
title: Stray
year: 2022
date: 2023-10-06T20:11:31.688Z
platform: PS5
permalink: /almanac/games/2023-10-06-stray/index.html
+ giantbombid: 78954
+ giantbomburl: https://www.giantbomb.com/stray/3030-78954/
---

What a lovely game Stray is.  
```

### Books and Comics

This one was harder because of the way I had logged things. Sometimes I would log an individual comic, other times a block of them, or a handful of trade paperbacks at once. I split out some where I had done that into individual posts for each paperback where it made sense and cleaned up some other entries. But there was no good way to do this with an API without as much work as doing it manually, so I did just that.

For books with an ISBN (books and tradepaperbacks) I added `isbn13` to the frontmatter. For those without, that `customImage` attribute I setup earlier came in handy. I don't read anywhere near as much as I watch movies or TV so this isn't a massive issue having to do this by hand.

### Displaying the posters

All this work would be pointless if I wasn't going to display them on the Almanac page. To do this, I set up an `almanac-grid` layout to take in a `pagination` object and output the data. The final structure for my images looks like this:

```txt
/almanac
├── /movie
│   ├── /custom
│   │   └── 1001.jpg
│   └── 105.jpg
├── /book
│   ├── /custom
│   │   └── 1001.jpg
│   ├── 978-1631407932.jpg
│   └── ...
├── /tv
│   └── ...
└── /game
    └── ...
```

To get the image url, which is based on one of three different ID types as well as the entry type, I setup a filter to return the correct one.


```js
// filters.js
getAlmanacImage: ({ type, tmdbid, giantbombid, customImage, isbn13 }) => {
	let filePath = null

	if (customImage) {
		filePath = `custom/${customImage}`
	} else if (tmdbid) {
		filePath = tmdbid
	} else if (giantbombid) {
		filePath = giantbombid
	} else if (isbn13) {
		filePath = isbn13
	}
	
	if (!filePath) return null
	
	return `/assets/catalog/almanac/${type}/${file}.jpg`
}

// almanac-grid.njk
{% raw %}{% set almanacImage %}{{ { type: type, tmdbid: tmdbid, giantbombid: giantbombid, customImage: customImage, isbn13: isbn13 } | getAlmanacImage }}{% endset %}{% endraw %}

{% if almanacImage %}
	<div class="almanac-poster-wrap">
		<hyper-card class="almanac-single-poster" style="--hypercard-scale: 1.03">
			<img class="u-photo" src="{{ almanacImage }}" alt="{{ title }}">
		</hyper-card>   
	</div>
{% endif %}
```

This was also the perfect opportunity to use [Zach's `hyper-card` component](https://www.zachleat.com/web/hypercard/). I'm using it on the grid view and [the single entry page](https://rknight.me/almanac/movies/2024-04-23-spider-man-into-the-spider-verse-2018/).

This was, aside from a nice way to display my entries, a prerequisite for starting my new CMS. Knowing what the file structure was going to look like will make it a lot easier to build the media logging part of the system.