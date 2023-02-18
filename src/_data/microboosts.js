const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")
const fs = require('fs')
const cheerio = require('cheerio')

module.exports = async function() {
    console.log("Fetching boosts")
    let asset = new AssetCache("boosts")

    // if (asset.isCacheValid('1h'))
    // {
    //     console.log("Returning mastodo data from cache")
    //     return await asset.getCachedValue()
    // }

    let data = await fetch('https://api.rknight.me/api/mastodon-boosts.json')
        .then(res => res.json())
        .then(json => {
            return json
        })

    // await asset.save(data, "json")

    // posts: [],
    // tags: [],
    // tagMap: {},
    return Object.values(data)
}
