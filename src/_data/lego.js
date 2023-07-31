const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching brickset data")
    let asset = new AssetCache("brickset_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning brickset data from cache" )
        return await asset.getCachedValue()
    }

    const data = await fetch('https://api.rknight.me/api/data.json')
        .then(res => res.json())
        .then(json => {
            return json
        })

    await asset.save(data.brickset, "json")

    return data.brickset
}
