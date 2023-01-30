const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching web mentions")
    let asset = new AssetCache("web_mentions")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning now data from cache" )
        return await asset.getCachedValue()
    }

    const mentions = await fetch('https://api.rknight.me/api/webmentions.json')
        .then(res => res.json())
        .then(json => {
            return json.mentions
        })

    const data = { mentions }

    await asset.save(data, "json")

    return data
}
