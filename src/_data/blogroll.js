const xml2Json = require('xml2json')
const { AssetCache } = require("@11ty/eleventy-fetch")

const blogs = [
    // { name: 'Cory Dransfeldt', url: 'https://coryd.dev', feed: 'https://feedpress.me/coryd' },
    // { name: 'Keenan', url: 'https://gkeenan.co/avgb', feed: 'https://gkeenan.co/avgb?format=rss' },
    // { name: 'David Daaaaaarnes', url: 'https://darn.es', feed: 'https://darn.es/rss.xml' },
    // { name: 'Jason Burk', url: 'https://grepjason.sh', feed: 'https://grepjason.sh/rss.xml' },
    // { name: 'Zoe Aubert', url: 'https://zoeaubert.me', feed: 'https://zoeaubert.me/rss.xml' },
    // { name: 'Sophie Koonin', url: 'https://localghost.dev', feed: 'https://localghost.dev/feed.xml' },
    // { name: 'Martin Feld', url: 'https://loungeruminator.net', feed: 'https://loungeruminator.net/feed/' },
    // { name: 'Joe Steel', url: 'https://joe-steel.com', feed: 'https://joe-steel.com/feed' },
    // { name: 'Lewis Dale', url: 'https://lewisdale.dev', feed: 'https://lewisdale.dev/feed/' },
    // { name: 'Jarrod Blundy', url: 'https://heydingus.net', feed: 'https://heydingus.net/feed.rss' },
    // { name: 'Wade Urry', url: 'https://www.iwader.co.uk', feed: 'https://iwader.co.uk/feed.xml' },
    // { name: 'fLaMEd', url: 'https://flamedfury.com', feed: 'https://flamedfury.com/feed.xml/' },
    // { name: 'Matt Birchler', url: 'https://birchtree.me', feed: 'https://birchtree.me/rss/' },
    // { name: 'Andrew Canion', url: 'https://canion.blog', feed: 'https://canion.blog/categories/article/feed.xml' },
    // { name: 'Apple Annie', url: 'https://weblog.anniegreens.lol/', feed: 'https://weblog.anniegreens.lol/rss.xml' },
    // { name: 'Zach Leatherman', url: 'https://www.zachleat.com', feed: 'https://www.zachleat.com/web/feed' },
    // { name: 'Marty Day', url: 'https://www.blast-o-rama.com', feed: 'https://www.blast-o-rama.com/feed/' },
    // { name: 'Adam Newbold', url: 'https://notes.neatnik.net', feed: 'https://notes.neatnik.net/rss.xml' },
]

module.exports = async () => {
    console.log("Fetching blogroll data")
    let asset = new AssetCache("blogroll_data")

    if (asset.isCacheValid('1h'))
    {
        console.log("Returning blogroll data from cache" )
        return await asset.getCachedValue()
    }

    const promises = blogs.map(async (blog) => {
        const feed = await fetch(blog.feed)
        const xml = await feed.text()
        const data = await xml2Json.toJson(xml, { object: true })
        if (data.feed?.entry) {
            const firstPost = (Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry]).slice(0, 1)[0]
            blogData = {
                ...blog,
                post: {
                    title: firstPost.title,
                    link: Array.isArray(firstPost.link) ? firstPost.id : firstPost.link.href,
                }
            }
        } else {
            const firstPost = (Array.isArray(data.rss.channel.item) ? data.rss.channel.item : [data.rss.channel.item]).slice(0, 1)[0]
            blogData = {
                ...blog,
                post: {
                    title: firstPost.title,
                    link: firstPost.link,
                }
            }
        }

        if (!blogData.post.link.startsWith('http')) {
            blogData.post.link = `${blog.url}${blogData.post.link}`
        }

        return blogData
    })
    const data = await Promise.all(promises)
    
    await asset.save(data, "json")

    return data
}