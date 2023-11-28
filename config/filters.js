const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

module.exports = {
    trim: (string, limit) => {
        return string.length <= limit ? string : `${string.slice(0, limit)}...`
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

        return 'https://rknight.me/assets/img/preview.png'
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
            .filter(entry => entry['wm-target'] === `https://rknight.me${url}`)
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
    }
}
