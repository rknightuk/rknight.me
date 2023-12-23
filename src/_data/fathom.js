const fetch = require("node-fetch")
const { AssetCache } = require("@11ty/eleventy-fetch")
const moment = require('moment')
const qs = require('qs')
const glob = require('glob').glob
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function() {
    console.log("Fetching Fathom popular pages")
    let asset = new AssetCache("fathom")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning Fathom popular pages from cache" )
        return await asset.getCachedValue()
    }

    const files = await glob('./src/posts/**/*.md')

    const titleMap = {}

    files.forEach(page => {
        const content = fs.readFileSync(page, 'utf8')

        const permalink = content.match(/^permalink: ?(.*$)/gm)[0].split('permalink: ')[1].replace('index.html', '')
        let title = content.match(/^title: ?(.*$)/gm)[0].split('title: ')[1]
        if (title.startsWith('"'))
        {
            title = title.slice(1,-1)
        }
        titleMap[permalink] = title
        titleMap[permalink.replace('/blog/', '/')] = title
    })

    const date_from = moment().subtract(90, 'days').format('YYYY-MM-DD HH:mm')
    const date_to = moment().format('YYYY-MM-DD HH:mm')

    const query = qs.stringify({
        entity: 'pageview',
        entity_id: process.env.FATHOM_SITE_CODE,
        aggregates: 'pageviews',
        field_grouping: 'pathname',
        date_from,
        date_to,
        sort_by: 'pageviews:desc',
        limit: 100
    })

    const res = await fetch(`https://api.usefathom.com/v1/aggregations?${query}`, {
        headers: {
            'Authorization': `Bearer ${process.env.FATHOM_API_KEY}`,
        }
    })
    const json = await res.json()
    const data = json.filter(pv => {
        return Object.keys(titleMap).includes(pv.pathname) && pv.pathname !== '/convert-spotify-facebook-to-email-login/'
    }).slice(0, 20).map(pv => {
        return {
            title: titleMap[pv.pathname],
            url: pv.pathname,
            pageviews: pv.pageviews
        }
    })
    
    await asset.save(data, "json")

    return data
}