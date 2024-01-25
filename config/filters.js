const marked = require('marked')
const sanitizeHTML = require('sanitize-html')
const moment = require('moment')
const slugify = require('slugify')
const cheerio = require('cheerio')
const { encode, decode } = require('html-entities')
const mastodonCount = require('./mastodonCounter.js')

module.exports = {
    trim: (string, limit) => {
        return string.length <= limit ? string : `${string.slice(0, limit)}...`
    },
    rssClubAlert: (content, rssClub) => {
        if (!rssClub) return content
        return `<p>Welcome to the Knight club - RSS-only posts. These only show for RSS subscribers but feel free to share them. <a href="https://daverupert.com/rss-club/">Read more about RSS club</a>.</p> <hr> ${content}`
    },
    makeSlugForOgImage: (url) => {
      return slugify(url, { lower: true })  
    },
    imageLink: (path) => {
        if (path.startsWith('https://rknightuk.s3.amazonaws.com')) return path
        return `https://rknightuk.s3.amazonaws.com/${path}`
    },
    toLowerCase: (string) => {
        return string.toLowerCase()
    },
    // usage {{ myObject | objectDebug | safe }}
    objectDebug: function(value) {
        return `<pre>${JSON.stringify(value, '', 2)}</pre>`
    },
    postPath: (path) => {
        if (path.includes('micro/')) return path
        return `/micro/${path}`
    },
    stripIndex: (path) => {
        if (!path) return ''
        return path.replace('/index.html', '/')
    },
    mdToHtml: (content) => {
        if (!content) return ''
        return marked.parse(content)
    },
    mdToHtmlInline: (content) => {
        if (!content) return ''
        return marked.parseInline(content)
    },
    getFirstAttachment: (post) => {
        if (post && post.attachments && post.attachments.length > 0)
        {
            return post.attachments[0].url ? post.attachments[0].url : post.attachments[0]
        }

        return 'https://rknight.me/assets/img/preview_small.png'
    },
    getTypeEmoji: (type) => {
        const emoji = {
            book: '📚',
            movie: '🍿',
            tv: '📺',
            game: '🎮',
        }

        return emoji[type]
    },
    getRssId: (post) => {
        if (moment(post.date).isBefore(moment('2023-12-23')))
        {
            return post.url.replace('/blog/', '/')
        }

        return post.url
    },
    getYouTubeLinks: (post) => {
        if (!post.links || post.links.length === 0)
        {
            return []
        }

        const youtubeIds = []

        post.links.forEach(l => {
            const matches = l.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/)
            if (matches && matches[6])
            {
                youtubeIds.push(matches[6])
            }
        })

        return youtubeIds
    },
    attachmentOrCustomOg: (post) => {
        if (post && post.attachments && post.attachments.length > 0)
        {
            return post.attachments[0].url ? post.attachments[0].url : post.attachments[0]
        }
    
        return `https://rknight.me/assets/img/almanac/${post.fallback}.png`
    },
    webmentionsByUrl: (webmentions, url) => {
        const allowedTypes = ['mention-of', 'in-reply-to', 'like-of', 'repost-of']

        const data = {
            'like-of': [],
            'repost-of': [],
            'in-reply-to': [],
        }

        const hasRequiredFields = entry => {
            const { author, published, content } = entry
            return author.name && published && content
        }

        const filtered = webmentions
            .filter(entry => {
                return entry['wm-target'] === `https://rknight.me${url}` || entry['wm-target'] === `https://rknight.me${url.replace('/blog', '')}`
            })
            .filter(entry => allowedTypes.includes(entry['wm-property']))

        filtered.forEach(m => {
            if (data[m['wm-property']])
            {
                const exists = data[m['wm-property']].find(wm => {
                    return wm['wm-id'] === m['wm-id']
                })
                if (exists) return

                const isReply = m['wm-property'] === 'in-reply-to'
                const isValidReply = isReply && hasRequiredFields(m)
                if (isReply)
                {
                    if (isValidReply)
                    {
                        m.sanitized = sanitizeHTML(m.content.html).replace(/\?\?\?\?/g, '') // fix for https://github.com/aaronpk/webmention.io/issues/203
                        data[m['wm-property']].unshift(m)
                    }

                    return
                }

                data[m['wm-property']].unshift(m)
            }
        })

        data['in-reply-to'].sort((a,b) => (a.published > b.published) ? 1 : ((b.published > a.published) ? -1 : 0))

        return data
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
    makeTootText: (post) => {
        const permalink = `https://rknight.me${post.permalink}`
        let mastoUsername = null
        if (post.author.mastodon)
        {
            const url = new URL(post.author.mastodon)
            mastoUsername = `${url.pathname.replace('/', '')}@${url.host}`
        }

        let content = `⭐ ${decode(post.title)} ${mastoUsername ? `by ${mastoUsername}` : ''} ${post.link}`

        const $ = cheerio.load(`<div id="content">${decode(post.content)}</div>`)
        let allText = $('#content').text().trim()

        $('blockquote').get().forEach(element => {
            allText = allText.replace($(element).text().trim(), `"${$(element).text().trim()}"`)
        })

        const contentWithAllText = `${content}\n\n${allText}\n\n📌 ${permalink}`
        const firstQuote = `"${$('blockquote').first().text().trim()}"`
        const contentWithFirstQuote = `${content}\n\n${firstQuote}\n\n📌 ${permalink}`

        if (mastodonCount.getMastodonLength(contentWithAllText).length <= 500)
        {
            content = contentWithAllText
        } else if (mastodonCount.getMastodonLength(contentWithFirstQuote).length <= 500)
        {
            content = contentWithFirstQuote
        } else {
            content = `${content}\n\n📌 ${permalink}`
        }

        return content
    }
}
