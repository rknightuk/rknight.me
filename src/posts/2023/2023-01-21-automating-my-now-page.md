---
title: Automating My Now Page
permalink: /automating-my-now-page/index.html
date: 2023-01-21
excerpt: "How I automated my now page updates"
layout: post
---

This post outlines how I automated my now page(s) but I should start with what a now page _is_. From [nownownow.com](https://nownownow.com/about):

> a website with a link that says “now” goes to a page that tells you what this person is focused on at this point in their life. For short, we call it a "now page"

I had heard of now pages a long time ago and always meant to add one to my site but just never got round to it. A few weeks ago [omg.lol](https://home.omg.lol/referred-by/robb) launched their now page feature which made me think about this again (and I want to keep both my personal site and the omg.lol now page up to date and in sync). One problem with a page that should, in theory, be updated regularly is I will _definitely_ forget to do it. Automation to the rescue! Or more specifically a veritable grab-bag of python and node scripts, web scraping, and APIs.

If you just want to see the pages here are the links:

- [/now](/now)
- [robb.omg.lol/now](https://robb.omg.lol/now)

The [source code is on GitHub](https://github.com/rknightuk/api).

### Overview

For each service I'm pulling data from I'm doing mostly the same thing:

1. Fetch some data from _somewhere_
2. Format that data to make is easier to work with
3. Add it to [`data.json`](https://api.rknight.me/api/data.json)

I then call [`now/generate.js`](https://github.com/rknightuk/api/blob/main/now/generate.js) which goes through each key in `data.json` and outputs it to two markdown files: [`now-omg.txt`](https://api.rknight.me/api/now-omg.txt) (for omg.lol) and [`now-web.txt`](https://api.rknight.me/api/now-web.txt) (for my website). The web version skips the omg.lol-specific syntax and intro section.

For omg.lol, I wanted to append icons to each line so they display as the bullet on my omg.lol now page. I grabbed icons for each section from [Font Awesome](https://fontawesome.com/) and apply them as I loop through item in a section:

```js
const text = `Some text from an item ${getIcon('making', 1)}`

const getIcon = (key, index) => {
    const icons = {
        making: ['microphone-lines', 'laptop-code', 'terminal', 'code-pull-request', 'bug'],
        reading: ['book', 'book-bookmark', 'book-open', 'book-open-reader', 'bookmark'],
        music: ['headphones', 'radio', 'guitar', 'compact-disc', 'drum', 'sliders', 'volume-high'],
        podcast: ['headphones', 'microphone-lines', 'comments', 'tower-broadcast', 'podcast'],
    }

    return icons[key][index]
}
```

![Example of icons on omg.lol](https://rknightuk.s3.amazonaws.com/site/now-podcasts.png)

### Getting the data

#### Music

- [`services/lastfm.js`](https://github.com/rknightuk/api/blob/main/services/lastfm.js)

This was a nice easy one: show the albums, tracks, and artists I've been listening to the past seven days. [Last.fm](https://www.last.fm/api) have a decent, if slightly oddly designed, API to get this data.

Not so easy is that Last.fm no longer return artist or track images. To get around this I do a lookup with the [MusicBrainz](https://musicbrainz.org/doc/MusicBrainz_API) which gives me a link to [AllMusic](https://www.allmusic.com/artist/mn0000289599) which I then scrape and grab the main image with [Cheerio](https://cheerio.js.org/).

I also use [`text-to-image`](https://www.npmjs.com/package/text-to-image) to generate images for artists and albums where I'm unable to get one either from Last.fm or AllMusic:

```js
await textToImage.generate(`${album.name} by ${album.artist.name}`, {
    maxWidth: 200,
    customHeight: 200,
    textColor: 'white',
    textAlign: 'center',
    margin: 20,
    bgColor: 'black',
    verticalAlign: 'center'
})
```

![Example of top album output](https://rknightuk.s3.amazonaws.com/site/now-albums.png)

#### Github, Books, and Statuses

- [`services/github.js`](https://github.com/rknightuk/api/blob/main/services/github.js)
- [`services/books.js`](https://github.com/rknightuk/api/blob/main/services/books.js)
- [`services/statuses.js`](https://github.com/rknightuk/api/blob/main/services/statuses.js)

These are all straight-forward API calls with a slightly manually process of tagging projects on GitHub with `now` - I don't want every recent project showing up and GitHub doesn't have an API for star lists yet.

#### Games

- [`services/psn.js`](https://github.com/rknightuk/api/blob/main/services/psn.js)
  
Like the missing artist images, this involved scraping a page because PSN doesn't have an API. I scrape my [PSN Profiles](https://psnprofiles.com/rknightuk) and use Cheerio to grab the latest games I've got trophies for. It's not a perfect system, but it's likely the current game I'm playing will be the top of that list.

#### Overcast

- [`services/overcast.js`](https://github.com/rknightuk/api/blob/main/services/overcast)

**This export isn't a secret, not are scripts to download it but don't hammer this endpoint. I'm downloading once a week. I have emailed Marco to ask if he'd implement an RSS feed of listen history so this isn't required.**

This one was trickier but doable. Overcast offers an ["All Data" export](https://overcast.fm/account) but you need to be logged in to access it. And it's in OPML format. So this is a two step process:

1. Use [this python script](https://github.com/rknightuk/api/tree/main/services/overcast/fetcher) to login and download the export
2. Run [this node script](https://github.com/rknightuk/api/tree/main/services/overcast/parser) to convert the OPML to JSON and then to [a valid JSON feed](https://api.rknight.me/api/podcasts.json)

One thing I noticed is that [Relay's member show](https://www.relay.fm/membership) feeds show the episode and show URL as `relay.fm/membership` so I had to handle this myself. Example here with [Connected Pro](https://www.relay.fm/connected):

```js
const isConnectedPro = podcast.title === 'Connected Pro'

let episodeUrl = episode.url
if (isConnectedPro)
{
    const episodeNumber = episode.title.split(':')[0]
    episodeUrl = `https://relay.fm/connected/${episodeNumber}`
}
```

From this data, I take the last 30 episodes, group them by show, and rank them by episode count which then becomes the podcasts section of the now page.

#### Other

- [`services/other.js`](https://github.com/rknightuk/api/blob/main/services/other)

For the "about" and "tv" sections, I wanted to be able to update these from anywhere so I opted to dump some yaml in an [omg.lol pastebin](https://robb.paste.lol/now.yaml) and fetch it from there.

### Syncing the changes

Each data source doesn't need to be updated every hour or day, so I split them out into a [`makefile`](https://github.com/rknightuk/api/blob/main/makefile) for jobs to run on a Monday (music, books, games), a Friday (Overcast), and daily (about, tv, github projects). (I could have done these all as separate cron jobs but it was easier to split them in a make file and just have three scheduled jobs instead).

Each time a job runs, it updates the `data.json` file so I can run `generate.js` and [`update.js`](https://github.com/rknightuk/api/blob/main/now/update.js) at any time throughout the week to update my now pages. The `update` script posts the contents of `web-omg.txt` to the [omg.lol API](https://api.omg.lol/) and sends a webhook to [Forge](https://forge.laravel.com) to deploy my main site.

All of the code for this is [on GitHub](https://github.com/rknightuk/api/) if you want to do something similar.
