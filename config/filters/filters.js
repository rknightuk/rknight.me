const marked = require('marked')
const moment = require('moment')
const nunjucks = require('nunjucks')

const utils = require('./utils.js')
const recipeHandler = require('../recipeHandler')

module.exports = {
    recipeOutput: (raw) => {
        return recipeHandler.getRecipeData(raw)
    },
    renderContentForFeed: (content, post) => {
        let formatted = content
    
        if (post.data.rssClub) {
            formatted = `<p>Welcome to the Knight club - RSS-only posts. These only show for RSS subscribers but feel free to share them. <a href="https://daverupert.com/rss-club/">Read more about RSS club</a>.</p> <hr> ${formatted}`
        }

        if (post.data.attachments) {
            const attachments = post.data.attachments.map(attachment => {
                return `<p><img src="${attachment.url}" alt="${attachment.alt}"></p>`
            }).join(' ')

            formatted = `${formatted} ${attachments}`
        }

        if (post.data.recipe) {
            const recipeHtml = nunjucks.render('src/_includes/recipe-core.njk', { 
                recipeData: recipeHandler.getRecipeData(post.data.recipe) 
            })
            formatted = `${formatted} ${recipeHtml}`
        }

        return formatted
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
        switch (data.postType) {
            case 'note':
                return '📝'
            case 'link':
                return '🔗'
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
    sortDiscussion: (data) => {
        return Object.values(Object.keys(data).sort().reduce(
            (obj, key) => { 
                obj[key] = data[key]; 
                return obj;
            }, 
            {}
        ))
    },
    getDiscussionIcon: (url) => {
        if (url.includes('news.ycombinator.com')) return 'hackernews'
        if (url.includes('lobste.rs')) return 'lobsters'
        if (url.includes('reddit.com')) return 'reddit'
        return 'external'
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
    getImages: (data) => {
        return utils.extractImages(data)
    },
    getAlmanacImage: ({ mediaType, tmdbid, giantbombid, customImage, isbn13 }) => {
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

        return filePath ? utils.getAlmanacImagePath(mediaType, filePath) : null
    },
    getBackdropImage: ({ mediaType, tmdbid, customBackdrop, imageIndex }) => {
        let filePath = null

        if (!['movie', 'tv'].includes(mediaType)) return null

        if (customBackdrop) {
            filePath = `custom/${customBackdrop}`
        } else if (tmdbid && imageIndex[mediaType].includes(`${tmdbid.toString()}.jpg`)) {
            filePath = `bd/${tmdbid}`
        }

        return filePath ? utils.getAlmanacImagePath(mediaType, filePath) : null
    },
    getRelatedEntries: ({ entries, type, tmdbid, giantbombid }) => {
        let related = []

        if (entries[`${type}-${tmdbid}`]) {
            related = entries[`${type}-${tmdbid}`] ?? []
        } else if (entries[`${type}-${giantbombid}`]) {
            related = entries[`${type}-${giantbombid}`] ?? []
        }

        return related.length < 2 ? [] : related
    },
    getTrophies: ({ title, platform, trophies }) => {
        const titleMatch = title.replace(/[^0-9A-Z]+/gi,"").toLowerCase()
        if (!trophies[platform]) return ''
        const data = trophies[platform][titleMatch]

        if (!data) return ''

        if (data.progress <= 0) return ''

        let content = `<div class="trophies">`

        Object.keys(data.earned).forEach((trophy) => {
            if (data.earned[trophy] > 0) {
                content += `<div class="trophy" title="${trophy}"><svg class="icon trophy-${trophy}"><use xlink:href="#trophy"></use></svg> <span>${data.earned[trophy]}</span></div>`
            }
        })

        content += `</div>`

        return content
    },
    getAchievements: ({ title, platform, achievements }) => {
        const titleMatch = title.replace(/[^0-9A-Z]+/gi,"").toLowerCase()
        if (!platform.toLowerCase().includes('xbox')) return ''
        
        const data = achievements[titleMatch]

        if (!data) return ''

        if (data.progress === '0%') return ''

        let ach = data.achievements.includes('/') ? data.achievements.split('/')[0] : data.achievements

        let content = `<div class="trophies achievements">
            <div class="trophy">
                <svg class="icon trophy-xbox"><use xlink:href="#trophy"></use></svg>
                <span>${ach}</span>
            </div>
            <div class="trophy">
                <svg class="icon trophy-xbox"><use xlink:href="#gamerscore"></use></svg>
                <span>${data.score}</span>
            </div>
        </div>`

        return content
    }
}
