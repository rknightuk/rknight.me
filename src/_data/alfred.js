const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching Alfred Workflows")
    let asset = new AssetCache("alfred_workflows")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning Alfred Workflows from cache" )
        return await asset.getCachedValue()
    }

    const res = await fetch("https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/api.json")
    const json = await res.json()
    const data = {
        workflows: json.map(w => {
            return {
                title: w.name,
                desc: w.description,
                link: w.link,
                image: w.screenshot,
                tags: [ `v${w.version}` ],
                icon: w.icon,
            }
        })
    }
    await asset.save(data, "json")

    return data
}
