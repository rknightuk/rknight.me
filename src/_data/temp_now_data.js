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

    const content = await fetch('https://api.rknight.me/api/data.json')
        .then(res => res.json())
        .then(text => {
            return text
        })

    console.log(content)

    // const nowStyles = await fetch('https://api.rknight.me/assets/now.css')
    //     .then(res => res.text())
    //     .then(text => {
    //         return text
    //     })

    // const data = {
    //     content,
    //     nowStyles,
    // }

    await asset.save(content, "json")

    return content
}
