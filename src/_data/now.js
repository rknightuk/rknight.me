const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching now data")
    let asset = new AssetCache("now_data")

    if (asset.isCacheValid('1d'))
    {
        console.log("Returning now data from cache" )
        return await asset.getCachedValue()
    }

    const content = await fetch('https://api.rknight.me/api/data.json')
        .then(res => res.json())
        .then(text => {
            return text
        })

    await asset.save(content, "json")

    return content
}
