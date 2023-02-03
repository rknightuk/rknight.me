const fetch = require("node-fetch");
const fs = require('fs');
const xml2Json = require('xml2json');
const { AssetCache } = require("@11ty/eleventy-fetch")

stripTags = (text) => {
  return text.replace(/<[^>]*>/g, '').replace(/\n\n/g, "\n").replace(/\n/g, " ")
}

module.exports = async function() {
    console.log("Fetching before data")
    let asset = new AssetCache("before data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning before data from cache" )
        return await asset.getCachedValue()
    }

  const watched = await fetch("https://letterboxd.com/rknightuk/rss/")
    .then(response => response.text())
    .then(str => xml2Json.toJson(str, { object: true }))
    .then(data => {
        return data.rss.channel.item.filter(p => !p.link.includes('/list')).slice(0, 5).map(l => {
            return {
                title: `${l['letterboxd:filmTitle']} (${l['letterboxd:filmYear']})`,
                link: l.link,
                date: l['letterboxd:watchedDate'],
            }
        })
    })

    const data = {
      watched,
    }

    await asset.save(data, "json")

    return data
};
