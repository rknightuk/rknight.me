---
title: Web Scraping with Node and Cheerio
permalink: /web-scraping-with-node-and-cheerio/index.html
date: 2023-01-22
excerpt: "A short tutorial on how to use Node and Cheerio to scrape some data from PSN profiles"
layout: post
---

_This post is a spin-off from [Automating My Now Page](/automating-my-now-page/)._

If you want to programatically get data from a site that doesn't have an API, scraping is the solution. Keep in mind scraping could be against the terms of service of some websites or illegal in some places. To scrape a website there are (at least in this tutorial) two steps:

1. Get the web page content
2. Find the data inside the HTML you've collected

For this tutorial, we'll scrape two things from [my PSN profile](https://psnprofiles.com/rknightuk):

- The latest game I'm playing
- The link to the game

We should end up with an object that looks something like this:

```js
scrapedData = {
 title: "Marvel's Guardians of the Galaxy",
 link: "https://psnprofiles.com/trophies/14419-marvels-guardians-of-the-galaxy/rknightuk",
}
```

### Setup

For this tutorial you'll need [Node](https://nodejs.org/en/) installed - version 17 or higher to make use of the native version of `fetch`.

Create a directory and navigate to it:

```bash
mkdir psn-scraper

cd psn-scraper

```

Next we will initialise the project. You can either fill in all the details or append `-y` to the command to skip all the questions:

```bash
# with questions
npm init

# skip all questions
npm init -y
```

Next we need to install [Cheerio](https://www.npmjs.com/package/cheerio). Cheerio is a subset of jQuery designed to run on the server for DOM parsing and manipulation.

```bash
npm install cheerio
```

If then install works correctly you should have a `package.json` and `package.lock` file in your directory.  In the `package.json`

Finally, we'll create our scraper file:

```
touch index.js
```

### Fetching the HTML

The first step is to fetch the HTML of the page we want to scrape which we'll do with `fetch`. In your `index.js` require `cheerio` and add a `run` function that using `async` (we'll be using `await` so this needs to be in a function).

```js
const cheerio = require('cheerio')

async function run() {
 const response = await fetch('https://psnprofiles.com/rknightuk')

 const body = await response.text()

 console.log(body)
}

run()
```

If we call `node index.js` a large amount of HTML will be output to the terminal. At this point we could use regex to find the data we want but using regex on HTML is notoriously difficult and unreliable. Instead Cheerio will do all the heavy lifting for us.

### Parsing the Data

The first thing we need to do is find a class name or ID on the list of games so we can correctly target it. If we inspect the first game in the list of games on my profile, we can see that the link itself which contains the title and url has a class of `title`:

![Web inspector showing the link with class names](https://rknightuk.s3.amazonaws.com/site/psn-profile-inspector.png)

On some websites this might be enough to get what we need, but a quick check in the console with `document.getElementsByClassName('title').length` shows there are 91 elements on the profile page with that class but the games list only has 75 games in it so we need to be more specific. The list of games is inside a `table` element with an ID of `gamesTable` so we can use that in combination with the `title` class name. If you've used jQuery before the syntax will be familiar to you:

```js
// ...
const body = await response.text()

// load the HTML into Cheerio
const $ = cheerio.load(body)

// this will return elements we don't want
const games = $('.title')

// this is more specific and only returns elements inside the games table
const games = $('#gamesTable .title')

console.log(games.length) // 75

```

We now have an array of games which we can get the title and link from. Because Cheerio's API is the same as jQuery we can used `first`,  `attr`, and `text` to get the values we need:

```js
// ...
const games = $('#gamesTable .title')

const path = games.first().attr('href')
const parsedData = {
 title: games.first().text(),
 link: `https://psnprofiles.com${path}`, // the href doesn't include the domain so we add it here
}

console.log(parsedData)
// {
//  title: "Marvel's Guardians of the Galaxy",
//  link: '/trophies/14419-marvels-guardians-of-the-galaxy/rknightuk'
// }
```

If we wanted to get _all_ the games in the list, we can use `each`:

```js
const parsedData = []

games.each((i, el) => {
 const path = $(el).attr('href')
 games.push({
  title: $(el).text(),
  link: `https://psnprofiles.com${path}`,
 })
})

console.log(parsedData)
// [
//  {
//    title: "Marvel's Guardians of the Galaxy",
//    link: 'https://psnprofiles.com/trophies/14419-marvels-guardians-of-the-galaxy/rknightuk'
//  },
//  {
//    title: 'Peggle 2',
//    link: 'https://psnprofiles.com/trophies/2935-peggle-2/rknightuk'
//  }
  // ...
// ]
```

All together:

```js
const cheerio = require('cheerio')

async function run() {
    const response = await fetch('https://psnprofiles.com/rknightuk')
    const body = await response.text()

    const $ = cheerio.load(body)
    const games = $('#gamesTable .title')

    const parsedData = {
        title: games.first().text(),
        link: games.first().attr('href'),
    }

    console.log(parsedData)
}

run()
```

Now we have that data, we could do anything we want with it like post it to a blog or add it to an RSS feed. The source code for this tutorial is [on GitHub](https://github.com/rknightuk/psn-scraper-demo).
