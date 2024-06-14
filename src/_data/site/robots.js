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
    const txt = await res.text()

    const bots = txt.split("\n").filter(line => line.startsWith("User-agent:")).map(line => line.split(":")[1].trim())

    const data = {
        txt: txt,
        nginx: bots.join('|'),
    }

    await asset.save(data, "json")

    return data
}
