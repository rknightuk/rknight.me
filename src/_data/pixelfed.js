const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-fetch")
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function() {
    console.log("Fetching pixelfed")
    let asset = new AssetCache("pixelfed")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning pixelfed from cache" )
        return await asset.getCachedValue()
    }

    const res = await fetch(`https://pixelfed.social/api/v1/accounts/666823685959544876/statuses`, {
        headers: {
            'Authorization': `Bearer ${process.env.PIXELFED}`,
        }
    })

    const json = await res.json()

    const data = json.slice(0, 3).map(p => {
        return {
            url: p.url,
            date: p.created_at,
            desc: p.content,
            image: p.media_attachments[0].preview_url,
            image_desc: p.media_attachments[0].description,
        }
    })

    await asset.save(data, "json")

    return data
}
