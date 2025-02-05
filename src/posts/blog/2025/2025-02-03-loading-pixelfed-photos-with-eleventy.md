---
title: "Loading Pixelfed Photos with Eleventy"
permalink: /blog/loading-pixelfed-photos-with-eleventy/index.html
date: 2025-02-03T22:21:01.918Z
excerpt: "How to load my latest photos from Pixelfed"
layout: post
tags:
    - Eleventy
---

I'm [no longer using Pixelfed](https://rknight.me/blog/doubts-about-pixelfed/) so the code I used to pull in my latest photos into Eleventy is redundant but it might be useful to other people. For `USER_ID`, grab this by going to your profile and it will be in the URL. Get an `API_KEY` from account settings. 

```js
// _data/pixelfed.js

const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-fetch")
const USER_ID = '12345'
const API_KEY = 'ABCDE'

module.exports = async function() {
    console.log("Fetching pixelfed")
    let asset = new AssetCache("pixelfed")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning pixelfed from cache" )
        return await asset.getCachedValue()
    }

    const res = await fetch(`https://pixelfed.social/api/v1/accounts/${USER_ID}/statuses`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
        },
    })

    const json = await res.json()

    const data = json.slice(0, 3).map(p => {
        return {
            url: p.url,
            date: p.created_at,
            desc: p.content,
            image: p.media_attachments[0].preview_url,
            image_desc: p.media_attachments[0].description,
        }
    })

    await asset.save(data, "json")

    return data
}
```

Then in my template:

```handlebars
// index.njk

<div>
	{% raw %}{%- for photo in pixelfed %}
		<a href="{{ photo.url }}">
			<img src="{{ photo.image }}" alt="{{ photo.image_desc }}" />
		</a>
	{% endfor %}{% endraw %}
</div>
```