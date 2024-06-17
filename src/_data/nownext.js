const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching nownext data")
    let asset = new AssetCache("nownext_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning nownext data from cache" )
        return await asset.getCachedValue()
    }

    const content = await fetch('https://cms.rknight.me/api/media')
        .then(res => res.json())
        .then(text => {
            return text
        })

    await asset.save(content, "json")

    return content
}
