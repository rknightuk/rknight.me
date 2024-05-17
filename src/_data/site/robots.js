const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching robots.txt")
    
    let asset = new AssetCache("robots.txt")

    if (asset.isCacheValid('1d'))
    {
        console.log("Returning robots.txt from cache" )
        return await asset.getCachedValue()
    }

    const res = await fetch("https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt")
    const data = await res.text()

    await asset.save(data, "text")

    return data
}
