---
title: "Fetching Achievements and Trophies for my Game Collection Page"
permalink: /blog/fetching-achievements-and-trophies-for-my-game-collection-page/index.html
date: 2024-07-07T18:21:00.565Z
excerpt: "How I'm fetching trophy and achievements to show on my game collection"
tags:
    - Development
    - Eleventy
    - Games
---

[Chris was inpired](https://chriskirknielsen.com/colophon/#gaming-library) to make his [game library page](https://chriskirknielsen.com/games/library/) by me. Then he went and added PSN trophy details so I became inspired to do the same - and also do Xbox achievements. I don't tend to chase getting trophies or achievements but it's nice to be able to see them all in one place anyway.

![Some games showing trophies](https://cdn.rknight.me/site/games-with-trophies.jpg)

> [!NOTE] Note
> Previously I was scraping [PSN Profiles](https://psnprofiles.com/rknightuk) for my current game but that got blocked (rightly) by CloudFlare so that was a no-go for getting this info.

### Trophies

To get my PSN trophies I did exactly what Chris did and used [`psn-api`](https://www.npmjs.com/package/psn-api). Unlike Chris, I didn't have the energy to add PSN IDs to my collection for matching trophies to games so I went a lazier route: I took all the alpha-numeric characters from the game title, removed spaces, and use that to match them. So `Grand Theft Auto V` has a key match of `grandtheftautov`. This avoids all the issues with trademark, copyright, and colons in titles.

I added a new option to my CLI for fetching the trophy data; I don't play enough that it needs to be done on a schedule and the code looks like this:

```js
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

import Module from 'node:module';
const require = Module.createRequire(import.meta.url);
const { exchangeNpssoForCode, exchangeCodeForAccessToken, getUserTitles } = require('psn-api')

export default async (__siteroot) => {
    const accessCode = await exchangeNpssoForCode(process.env.PSN_KEY);
	const authorization = await exchangeCodeForAccessToken(accessCode);

    let titles = await getUserTitles({ accessToken: authorization.accessToken }, 'me', { limit: 800, offset: 0 })

    const data = {
        PS5: {},
        PS4: {},
        PS3: {},
    }
    
    titles.trophyTitles.forEach(t => {
        const titleMatch = t.trophyTitleName.replace(/[^0-9A-Z]+/gi,"").toLowerCase()
        data[t.trophyTitlePlatform][titleMatch] = {
            titleRaw: t.trophyTitleName,
            progress: t.progress,
            platform: t.trophyTitlePlatform,
            earned: t.earnedTrophies,
        }
    })

    fs.writeFileSync(`${__siteroot}/src/_data/catalog/trophies.json`, JSON.stringify(data, null, 2), { flag: "w" })
}
```

The output in `trophies.json` looks like this for each game:

```json
{
	"horizonforbiddenwest": {
		"titleRaw": "Horizon Forbidden West",
		"progress": 65,
		"platform": "PS5",
		"earned": {
			"bronze": 47,
			"silver": 6,
			"gold": 1,
			"platinum": 0
		}
    },
    // the rest of the games
}
```

I added a custom filter to match the games and format the trophies then call it in the game collection template:

```js
getTrophies: ({ title, platform, trophies }) => {
	const titleMatch = title.replace(/[^0-9A-Z]+/gi,"").toLowerCase()
	if (!trophies[platform]) return ''
	const data = trophies[platform][titleMatch]

	if (!data) return ''

	if (data.progress <= 0) return ''

	let content = `<div class="trophies">`

	Object.keys(data.earned).forEach((trophy) => {
		if (data.earned[trophy] > 0) {
			content += `<div class="trophy" title="${trophy}"><svg class="icon trophy-${trophy}"><use xlink:href="#trophy"></use></svg> <span>${data.earned[trophy]}</span></div>`
		}
	})

	content += `</div>`

	return content
}
```

```handlebars
{% raw %}{{ { "title": game.title, "platform": platform.name, "trophies": catalog.trophies } | getTrophies | safe }}{% endraw %}
```

### Achievements

There doesn't appear to be any kind of API to get Xbox achievements so I went for a slightly less elegant solution. I logged into xbox.com. went to my profile, then wrote a script to grab the data out the HTML and format it for me. Then I just pasted into `achievements.json`.

```js
data = {}

Array.from(document.querySelectorAll('.recentProgressInfoWrapper')).forEach(e => {
    const score =e.getElementsByClassName('gamerscoreinfo')
    data[e.getElementsByClassName('recentProgressItemTitle')[0].innerText.replace(/[^0-9A-Z]+/gi,"").toLowerCase()] = {
        title: e.getElementsByClassName('recentProgressItemTitle')[0].innerText,
        achievements: e.getElementsByClassName('achievementinfo')[0].innerText,
        score: score[0].innerText,
        progress: e.getElementsByClassName('recentProgressPercentageNumber')[0].innerText
    }
})

copy(data)
```

I then created an achievements-specific filter and access it the same way in the template:

```handlebars
{% raw %}{{ { "title": game.title, "platform": platform.name, "achievements": catalog.achievements } | getAchievements | safe }}{% endraw %}
```

I use my Xbox even less than my Playstation so this won't be an issue to manually update these every now and again.

### Future Changes

I need to do some more work so that collections like Uncharted or Jak and Daxter list their individual games as they won't match up right now.

[View my game collection page](/collections/games) to see the trophies and achievements.