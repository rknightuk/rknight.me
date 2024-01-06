const xml2Json = require('xml2json')
const { AssetCache } = require("@11ty/eleventy-fetch")

const pods = [
    { name: 'Hemispheric Views', url: 'https://hemisphericviews.com/', feed: 'https://listen.hemisphericviews.com/rss' },
    { name: 'Really Specific Stories', url: 'https://www.rsspod.net/', feed: 'https://www.rsspod.net/rss' },
    { name: 'Connected', url: 'https://www.relay.fm/connected/', feed: 'https://www.relay.fm/connected/feed' },
    { name: 'Top Four', url: 'https://www.relay.fm/topfour/', feed: 'https://www.relay.fm/topfour/feed' },
    { name: 'Ungeniused', url: 'https://www.relay.fm/ungeniused/', feed: 'https://www.relay.fm/ungeniused/feed' },
    { name: 'UK Triv', url: 'https://www.theincomparable.com/gameshow/uktriv/', feed: 'https://feeds.theincomparable.com/gameshow/uktriv' },
    { name: 'Random Pursuit', url: 'https://www.theincomparable.com/gameshow/trivia/', feed: 'https://feeds.theincomparable.com/gameshow/trivia' },
    { name: 'AppStories', url: 'https://appstories.net', feed: 'https://appstories.net/episodes/feed' },
    { name: 'Defocused', url: 'https://www.theincomparable.com/defocused/', feed: 'https://feeds.theincomparable.com/defocused' },
    { name: 'Do By Friday', url: 'https://gkeenan.co/avgab', feed: 'https://gkeenan.co/avgab?format=rss' },
    { name: 'A Very Good (Audio) Blog', url: 'https://gkeenan.co/avgb/i-did-it-i-made-an-audio-blog-so-you-can-listen-in-your-car-without-driving-into-a-ditch', feed: 'https://gkeenan.co/avgab?format=rss' },
]

module.exports = async () => {
    console.log("Fetching podroll data")
    let asset = new AssetCache("podroll_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning podroll data from cache" )
        return await asset.getCachedValue()
    }

    const promises = pods.map(async (pod) => {
        const feed = await fetch(pod.feed)
        const xml = await feed.text()
        const data = await xml2Json.toJson(xml, { object: true })
        const firstPost = (Array.isArray(data.rss.channel.item) ? data.rss.channel.item : [data.rss.channel.item]).slice(0, 1)[0]
        const showData = {
            title: pod.name,
            image: data.rss.channel['itunes:image'].href,
            link: data.rss.channel.link,
        }

        return {
            show: showData,
            title: firstPost.title,
            link: firstPost.link,
        }
    })
    const data = await Promise.all(promises)
    
    await asset.save(data, "json")

    return data
}