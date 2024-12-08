const { decode } = require('html-entities')
const mastodonCount = require('./mastodonCounter.js')
const TurndownService = require('turndown')
const utils = require('./filters/utils')

const tootText = (post) => {
    let content = ''
    const permalink = `https://rknight.me${post.permalink}`

    if (!['link', 'almanac', 'note'].includes(post.layout))
    {
        content = `${decode(post.title)} ${permalink}`

        return content
    }

    const turndownService = new TurndownService()
    turndownService.addRule('link', {
        filter: 'a',
        replacement: function (content, node) {
            if (content === node.href) return content
            // <a href="/url">text</a> => text (/url)
            return `${content} (${node.href})`
        }
    })
    turndownService.addRule('blockquote', {
        filter: 'blockquote',
        replacement: function (content) {
            return `"${content.trim()}"`
        }
    })
    turndownService.addRule('remove', {
        filter: ['img'],
        replacement: function (content, node) {
          return ''
        }
    })

    const turnedDown = turndownService.turndown(decode(post.content))

    if (post.layout === 'note') return formatNote(turnedDown, permalink)
    if (post.layout === 'almanac') return formatAlmanac(post, turnedDown, permalink)
    if (post.layout === 'link') return formatLink(post, turnedDown, permalink)
}

const formatNote = (content, permalink) => {
    const combined = `${content}\n\n📌 ${permalink}`

    if (mastodonCount.getMastodonLength(content).length <= 476)
    {
        return combined
    }

    return `${content.slice(0, 475)}… ${permalink}`
}

const formatAlmanac = (post, content, permalink) => {
    let title = [
        utils.getAlmanacEmoji(post.type),
        `${utils.getAlmanacVerb(post.type)}:`,
        decode(post.title),
        post.season ? `Season ${post.season}` : null,
        post.platform ? `(${post.platform})` : null,
    ].filter(t => t).join(' ')

    let combined = `${title} ${permalink}`

    const contentWithReview = content.length > 0 ? `${combined}\n\n${content}` : combined
    if (mastodonCount.getMastodonLength(contentWithReview).length <= 500)
    {
        combined = contentWithReview
    }

    return combined
}

const formatLink = (post, content, permalink) => {
    let mastoUsername = null
    let formatted = ''
    if (post.author.mastodon)
    {
        const url = new URL(post.author.mastodon)
        mastoUsername = `${url.pathname.replace('/', '')}@${url.host}`
    }

    formatted = `⭐ ${decode(post.title)} ${mastoUsername ? `by ${mastoUsername}` : ''} ${post.link}`

    const firstLine = content.split('\n')[0]
    const formattedWithFirstLine = `${formatted}\n\n${firstLine}\n\n📌 Read more: ${permalink}`
    const formattedWithAll = content ? `${formatted}\n\n${content}\n\n📌 ${permalink}` : `${formatted}\n\n📌 ${permalink}`

    if (mastodonCount.getMastodonLength(formattedWithAll).length <= 500)
    {
        return formattedWithAll
    } else if (mastodonCount.getMastodonLength(formattedWithFirstLine).length <= 500)
    {
        return formattedWithFirstLine
    }

    formatted = `${formatted}\n\n📌 ${permalink}`

    return formatted
}

module.exports = { tootText }