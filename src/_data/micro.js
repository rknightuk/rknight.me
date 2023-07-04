const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")
const fs = require('fs')
const cheerio = require('cheerio')

module.exports = async function() {
    console.log("Fetching micro data")
    let asset = new AssetCache("micro_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning mastodo data from cache")
        return await asset.getCachedValue()
    }

    let data = await fetch('https://api.rknight.me/api/micro.json')
        .then(res => res.json())
        .then(json => {
            return json
        })

    await asset.save(data, "json")

    return data
}
