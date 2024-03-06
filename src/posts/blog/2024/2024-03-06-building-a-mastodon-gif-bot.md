---
title: "Building a Mastodon Gif Bot"
permalink: /blog/building-a-mastodon-gif-bot/index.html
date: 2024-03-04T14:51:15.852Z
excerpt: "Writing a script to run the @greatscott and @initech bots on beep.town"
layout: post
tags:
    - ActivityPub
    - Development
    - Movies
    - TV
project: https://github.com/rknightuk/gifbot
---

> So, I am converting every line of dialog of Office Space into a .gif. If that was to be a Mastobot, is that something you might be able to give some pointers on in the future? 

This was a message I got from [Jason](https://grepjason.sh) seven weeks ago. Jason then spent the next 28 hours converting [Office Space](https://www.themoviedb.org/movie/1542-office-space) into just over 1000 gifs and sent them to me so I could get to work on the bot code itself.

Jason [wrote a post](https://grepjason.sh/2024/officespace-gif) about how he converted the movies to gifs and the adventure he went on trying to find an instance to host it. He also [set up a page](https://grepjason.sh/office) to show a gif on each load if you're into that sort of thing.

![Office Space bot toot](https://cdn.rknight.me/site/office-space-bot.jpg)

I started by modifying the code I wrote for [KnightBot](https://knightbot.rknight.me) which runs my bots on [Bugle](https://bugle.lol/timeline). A bot for posting gifs has three parts to it:

1. Pick a random gif from a list
2. Check if that gif has been posted before
3. Post it to Mastodon

To pick a random gif the first thing I needed to do was setup the file structure for the script:

```bash
├── data/
│   └── officespace_gifs/
├── index.js
└── .env
```

I wanted this to be able to work for multiple bots so the prefix of `officespace` is important on the `officespace_gifs` folder - this is the bot key used to run the script: `node index.js officespace`. The `.env` file contains `INSTANCE`, the instance we're posting to and `officespace_TOKEN` which is the access token for Mastodon. This also uses the bot key.

The `index.js` file sets the current path (so the script can be run from anywhere), checks for a matching bot (in this case, `officespace`), then checks for a `.previous` file. This file is what keeps track of which gifs have been posted previously. If one doesn't exist, it will create it:

```js
import fs from 'fs'
import postToMastodon from './poster.js'

const bots = [
    'officespace'
]

const currentPath = process.argv[1].replace('index.js', '')

const getPreviousData = (botKey) => {
    const previousPath = `${currentPath}data/${botKey}.previous`
    const previousDataExists = fs.existsSync(previousPath)

    if (!previousDataExists)
    {
        console.log('🗒️ Making previous file')
        fs.writeFileSync(previousPath, '')
    }

    return fs.readFileSync(previousPath, 'utf8')
}

const run = async () => {
    const botKey = process.argv[2]

    if (!botKey) {
        console.log('❌ You must pass a bot key')
        return
    }

    if (!bots.includes(botKey))
    {
        console.log('❌ No bot found')
        return
    }

    let previous = getPreviousData(botKey)

    // ...
}
```

Once I have the previous data, I get a list of the gifs from `officespace_gifs`, pick a random one, then check if it's already been posted: if it has, I pick a new one until I get one that hasn't and add it to the `.previous` file.

```js
let previous = getPreviousData(botKey)

const gifs = fs.readdirSync(`${currentPath}data/${botKey}_gifs`)

let found = gifs[Math.floor(Math.random() * gifs.length)]

while (previous.includes(found))
{
    found = gifs[Math.floor(Math.random() * gifs.length)]
}

previous += `\n${found}`

fs.writeFileSync(`${currentPath}data/${botKey}.previous`, previous)

await postToMastodon(botKey, `${currentPath}data/${botKey}_gifs/${found}`)

```

Now I have a gif, I use the [`masto`](https://www.npmjs.com/package/masto) library to post it to Mastodon:

```js
import fs from 'fs'
import { createRestAPIClient } from 'masto'
import dotenv from 'dotenv'
dotenv.config()

export default async (botKey, filepath, description) => {
    const masto = createRestAPIClient({
        url: process.env.INSTANCE,
        accessToken: process.env[`${botKey}_TOKEN`],
    })

    const attachment = await masto.v2.media.create({
        file: new Blob([fs.readFileSync(filepath)]),
        description: description,
    })

    const status = await masto.v1.statuses.create({
        status: '',
        visibility: "public",
        mediaIds: [attachment.id],
    })

    return status
}
```

I handed the code over to Jason, he ran it, and hey presto we had the [first toot](https://beep.town/@initech/112016930647587447).

Since then, Jason kindly ran his script on Back to the Future, my favourite movie of all time, so I could set up [@greatscott](https://beep.town/@greatscott) to do the same thing. Since last night, he also has a [Matrix one too](https://beep.town/@zion). He cannot be stopped.

![Back to the Future bot toot](https://cdn.rknight.me/site/bttf-bot.jpg)

You can follow [@initech](https://beep.town/@initech), [@greatscott](https://beep.town/@greatscott), and [@zion](https://beep.town/@zion) on Mastodon and the code for [GifBot is on Github](https://github.com/rknightuk/gifbot).