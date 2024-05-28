const marked = require('marked')
const moment = require('moment')

const utils = require('./utils.js')

module.exports = {
    rssClubAlert: (content, rssClub) => {
        if (!rssClub) return content
        return `<p>Welcome to the Knight club - RSS-only posts. These only show for RSS subscribers but feel free to share them. <a href="https://daverupert.com/rss-club/">Read more about RSS club</a>.</p> <hr> ${content}`
    },
    imageLink: (path) => {
        if (path.startsWith('https://cdn.rknight.me')) return path
        return `https://cdn.rknight.me/${path}`
    },
    toLowerCase: (string) => {
        return string.toLowerCase()
    },
    // usage {{ myObject | objectDebug | safe }}
    objectDebug: function(value) {
        return `<pre>${JSON.stringify(value, '', 2)}</pre>`
    },
    stripIndex: (path) => {
        if (!path) return ''
        return path.replace('/index.html', '/')
    },
    mdToHtml: (content) => {
        if (!content) return ''
        return marked.parse(content)
    },
    getTypeEmoji: (type) => utils.getAlmanacEmoji(type),
    getPostEmoji: (data) => {
        switch (data.layout) {
            case 'note':
                return '📝'
            case 'link':
                return '🔗'
            case 'changelog':
                return '🪛'
            case 'almanac':
                return utils.getAlmanacEmoji(data.type)
            default:
                return '✨'
        }
    },
    getAlmanacVerb: (type) => utils.getAlmanacVerb(type),
    getRssId: (post) => {
        if (moment(post.date).isBefore(moment('2023-12-23')))
        {
            return post.url.replace('/blog/', '/')
        }

        return post.url
    },
    attachmentOrCustomOg: (post) => {
        if (post && post.attachments && post.attachments.length > 0)
        {
            return post.attachments[0].url ? post.attachments[0].url : post.attachments[0]
        }
    
        return `https://rknight.me/assets/img/almanac/${post.fallback}.png`
    },
    getAllTags: (collection) => {
        let tagSet = new Set()
        for (let item of collection) {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag))
        }
        return Array.from(tagSet)
    },
    popularPosts: (pageviews, limit, url) => {
        return pageviews.filter(pv => pv.url !== url).slice(0, limit)
    },
    oValues: (data) => {
        return Object.values(data)
    },
    sortByName: (arr) => {
        return arr.slice().sort((a, b) => {
            if (a.children.length > 0) {
                a.children = a.children.slice().sort((c, d) => {
                    return c.title.toLowerCase().localeCompare(d.title.toLowerCase())
                })
            }

            if (b.children.length > 0) {
                b.children = b.children.slice().sort((c, d) => {
                    return c.title.toLowerCase().localeCompare(d.title.toLowerCase())
                })
            }

            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        });
    },
    getAlmanacDescription: (data) => {
        return `An Almanac entry for ${data.title} ${utils.getAlmanacEmoji(data.type)}`
    },
    getAlmanacImage: ({ type, tmdbid, giantbombid, customImage, isbn13 }) => {
        let filePath = null

        if (customImage) {
            filePath = `custom/${customImage}`
        } else if (tmdbid) {
            filePath = tmdbid
        } else if (giantbombid) {
            filePath = giantbombid
        } else if (isbn13) {
            filePath = isbn13
        }

        return filePath ? utils.getAlmanacImagePath(type, filePath) : null
    },
    getRelatedEntries: ({ entries, type, tmdbid, giantbombid }) => {
        let related = []

        if (entries[`${type}-${tmdbid}`]) {
            related = entries[`${type}-${tmdbid}`] ?? []
        } else if (entries[`${type}-${giantbombid}`]) {
            related = entries[`${type}-${giantbombid}`] ?? []
        }

        return related.length < 2 ? [] : related
    }
}
