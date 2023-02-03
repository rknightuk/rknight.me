const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching podcast data")
    let asset = new AssetCache("podcast_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning podcast data from cache" )
        return await asset.getCachedValue()
    }

    const podcasts = await fetch('https://api.rknight.me/api/podcasts.json')
        .then(res => res.json())
        .then(json => {
            return json
        })

    const data = podcasts

    await asset.save(data, "json")

    return data
}
