import fetch from "node-fetch"
import * as xml2Json from "xml2json"
import { AssetCache } from "@11ty/eleventy-fetch"

const stripTags = (text) => {
    return text.replace(/<[^>]*>/g, '').replace(/\n\n/g, "\n").replace(/\n/g, " ")
}

const handle = (data, key) => {
    const showData = {
        title: data.rss.channel.title.replace(' Podcast', ''),
        art: `/assets/img/${key}-cover.png`,
        link: data.rss.channel.link,
    }
    return (Array.isArray(data.rss.channel.item) ? data.rss.channel.item : [data.rss.channel.item]).map(l => {
        let d = new Date(l['pubDate'])
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()
        if (month.length < 2)
            month = '0' + month
        if (day.length < 2)
            day = '0' + day
        return {
            show: showData,
            title: l['title'],
            desc: l['itunes:summary'] ? l['itunes:summary'] : l['itunes:subtitle'],
            link: l.link,
            date: [year, month, day].join('-'),
            year: year,
        }
    })
}

export default (async function () {
    console.log("Fetching my podcast data")
    let asset = new AssetCache("my podcast data")
    if (asset.isCacheValid('1d')) {
        console.log("Returning my podcast data from cache")
        return await asset.getCachedValue()
    }
    const ruminate = await fetch("https://ruminatepodcast.com/feed.xml")
        .then(response => response.text())
        .then(str => xml2Json.toJson(str, { object: true }))
        .then(data => handle(data, 'ruminate'))
    const family = await fetch("https://wegot.family/feed.xml")
        .then(response => response.text())
        .then(str => xml2Json.toJson(str, { object: true }))
        .then(data => handle(data, 'family'))
    const all = [
        ...family,
        ...ruminate,
    ].sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
    const latest = [
        family[0],
        ruminate[0],
    ].sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
    await asset.save({ all, latest }, "json")
    return { all, latest }
})
