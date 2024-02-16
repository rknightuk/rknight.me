const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching discussions")
    let asset = new AssetCache("discussions")

    if (asset.isCacheValid('5m'))
    {
        console.log("Returning discussions from cache" )
        return await asset.getCachedValue()
    }

    const res = await fetch("https://api.rknight.me/api/discussion.json")
    const json = await res.json()

    await asset.save(json, "json")

    return json
}
