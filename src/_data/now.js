const fetch = require('node-fetch')
const { AssetCache } = require("@11ty/eleventy-fetch")

module.exports = async function() {
    console.log("Fetching now data")
    let asset = new AssetCache("now_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning now data from cache" )
        return await asset.getCachedValue()
    }

    const status = await fetch('https://api.omg.lol/address/robb/statuses/')
        .then(res => res.json())
        .then(json => {
            return json.response.statuses[0]
        })

    const content = await fetch('https://api.rknight.me/api/now-web.txt')
        .then(res => res.text())
        .then(text => {
            return text
        })

    const albumStyles = await fetch('https://api.rknight.me/assets/now.css')
        .then(res => res.text())
        .then(text => {
            return text
        })

    const data = {
        status,
        content,
        albumStyles,
    }

    await asset.save(data, "json")

    return data
}
