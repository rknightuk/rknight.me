const utils = require('./utils')
const cheerio = require('cheerio')
const { decode } = require('html-entities')
const mastodonCount = require('../mastodonCounter.js')

module.exports = {
    makeTootText: (post) => {
        let content = ''
        const permalink = `https://rknight.me${post.permalink}`

        if (!['link', 'almanac', 'note'].includes(post.layout))
        {
            content = `${decode(post.title)} ${permalink}`

            return content
        }

        const $ = cheerio.load(`<div id="content">${decode(post.content)}</div>`)
        let allText = $('#content').text().trim().replace('\n', '\n\n')

        $('blockquote').get().forEach(element => {
            allText = allText.replace($(element).text().trim(), `"${$(element).text().trim()}"`)
        })

        if (post.layout === 'almanac')
        {
            let title = [
                utils.getAlmanacEmoji(post.type),
                `${utils.getAlmanacVerb(post.type)}:`,
                decode(post.title),
                post.season ? `Season ${post.season}` : null,
                post.platform ? `(${post.platform})` : null,
            ].filter(t => t).join(' ')

            content = `${title} ${permalink}`

            const contentWithReview = `${content}\n\n${allText}`
            if (mastodonCount.getMastodonLength(contentWithReview).length <= 500)
            {
                content = contentWithReview
            }

            return content
        }

        if (post.layout === 'note') 
        {
            content = `${allText} ${permalink}`

            if (mastodonCount.getMastodonLength(content).length <= 476) 
            {
                return content
            }
        
            return `${content.slice(0, 476)}... ${permalink}`
        }

        let mastoUsername = null
        if (post.author.mastodon)
        {
            const url = new URL(post.author.mastodon)
            mastoUsername = `${url.pathname.replace('/', '')}@${url.host}`
        }

        content = `⭐ ${decode(post.title)} ${mastoUsername ? `by ${mastoUsername}` : ''} ${post.link}`

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
    },
    getTitleForOg: (post) => {
        return decode(post.data.title)
    },
    getAlmanacDescription: (data) => {
        return `An Almanac entry for ${data.title} ${utils.getAlmanacEmoji(data.type)}`
    },
    getOgImageUrl: (page) => {
        if (page.attachments && page.attachments.length > 0)
        {
            return page.attachments[0].url ? page.attachments[0].url : page.attachments[0]
        }

        let path = page.url
        if (page.permalink === '404.html') {
            path = '/404/'
        }

        if (path.startsWith('/notes/') && path !== '/notes/') {
            path = '/notes/single/'
        }
        const url = encodeURIComponent(`https://rknight.me/opengraph${path}`)
        return `https://v1.screenshot.11ty.dev/${url}/opengraph/_123`
    },
    getOpengraphUrl: (inputPath) => {
        let path = inputPath
        if (path.startsWith('/notes/') && path !== '/notes/') {
            path = '/notes/single/'
        }

        const url = encodeURIComponent(`https://rknight.me/opengraph${path}`)
        return `https://v1.screenshot.11ty.dev/${url}/opengraph/_123`
    }
}