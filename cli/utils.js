import select from '@inquirer/select'
import fs from 'fs'
import { parseHTML } from 'linkedom'

const FEED_SELECTORS = [
    'link[type="application/rss+xml"]',
    'link[type="application/atom+xml"]',
    'link[type="application/json"]',
]

const _getProjectData = (__siteroot) => {
    return JSON.parse(fs.readFileSync(`${__siteroot}/src/_data/site/projects.json`, 'utf8'))        
}

const _fetchPageHtml = async (link) => {
    const domain = new URL(link).origin
    const page = await fetch(link)
    const html = await page.text()

    const { document } = parseHTML(html)

    return document
}

export default {
    slugify: (string) => {
        return string.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')
    },
    fetchPageHtml: async (link) => {
        return await _fetchPageHtml(link)
    },
    fetchPageData: async (link, options) => {
        const data = {}
        const document = await _fetchPageHtml(link)
        
        if (options.includes('title')) data.title = document.querySelector('title').textContent
        if (options.includes('description')) {
            let description = document.querySelector('meta[name="description"]')?.getAttribute('content')
            if (!description) description = document.querySelector('meta[property="og:description"]')?.getAttribute('content')

            data.description = description
        }
        if (options.includes('author'))
        {
            let authorName = document.querySelector('.p-name')?.textContent
            if (!authorName) authorName = document.querySelector('[rel="author"]')?.textContent
            data.author = authorName
        }
        if (options.includes('mastodon'))
        {
            data.mastodon = Array.from(document.querySelectorAll('[rel="me"]')).filter(e => {
                return e.href.includes('@') && !e.href.includes('twitter.com') && !e.href.includes('threads.net') && !e.href.includes('tiktok.com')
            }).map(e => e.href)
        }

        if (options.includes('feed'))
        {
            let feedUrl = null
            FEED_SELECTORS.forEach((selector) => {
                if (feedUrl) return
                const feedLink = document.querySelector(selector)
                if (feedLink) feedUrl = feedLink.href
            })

            if (feedUrl && !feedUrl.startsWith('http')) feedUrl = `${domain}${feedUrl}`

            data.feed = feedUrl
        }

        if (options.includes('image'))
        {
            data.image = document.querySelector("meta[property='og:image']")?.getAttribute('content')
        }

        return data
    },
    getProjectsData: (__siteroot) => {
        return _getProjectData(__siteroot)
    },
    selectProject: async (__siteroot, firstOption) => {
        let existingProjects = _getProjectData(__siteroot)
        existingProjects = [
            firstOption || {},
            ...existingProjects.current, 
            ...existingProjects.podcasts, 
            ...existingProjects.profile, 
            ...existingProjects.stjude
        ]

        return await select({
            message: 'Select Project',
            choices: existingProjects.map((project, i) => {
                return {
                    name: project.title,
                    value: project,
                    description: project.description,
                }
            }),
            pageSize: 15,
        })
    }
}