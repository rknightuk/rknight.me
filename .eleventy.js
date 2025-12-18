import collections from './config/collections.js'
import shortcodes from './config/shortcodes.js'
import filters from './config/filters/filters.js'
import dateFilters from './config/filters/date.js'
import indiewebFilters from './config/filters/indieweb.js'
import plugins from './config/plugins.js'

import markdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItFigCaptions from 'markdown-it-image-figures'
import markdownItGithubAlerts from 'markdown-it-github-alerts'
import { mention } from '@fedify/markdown-it-mention'

import slugify from 'slugify'

export default (function (eleventyConfig) {
    const options = {
        html: true, // Enable HTML tags in source
        breaks: true, // Convert '\n' in paragraphs into <br>
        linkify: true // Autoconvert URL-like text to links
    }

    let markdownLib = markdownIt(options)
        .use(markdownItFootnote)
        .use(markdownItGithubAlerts)
        .use(markdownItFigCaptions, { figcaption: true })
        .use(mention, {
            link: (handle) => {
                const [username, domain] = handle.split('@').filter(f => f)
                return `https://${domain}/@${username}`
            },
        })

    // replace the stupid emoji
    markdownLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
        var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
        if (tokens[idx].meta.subId > 0) {
            id += ':' + tokens[idx].meta.subId
        }
        return ' <a href="#fnref' + id + '" class="footnote-backref">&#10558;</a>'
    }
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addFilter("slug", function (str, options = {}) {
        options.lower ??= true;
        return slugify('' + str, options);
    });
    
    // passthrough
    ['src/assets'].forEach(path => {
        eleventyConfig.addPassthroughCopy(path)
    })

    // plugins
    plugins.forEach(plugin => {
        eleventyConfig.addPlugin(plugin.name, { ...plugin.options })
    })

    // collections
    Object.keys(collections).forEach(collectionName => {
        eleventyConfig.addCollection(collectionName, collections[collectionName])
    })
    
    // shortcodes
    Object.keys(shortcodes).forEach(shortcodeName => {
        eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    // filters
    Object.keys(filters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    })

    // date filters
    Object.keys(dateFilters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, dateFilters[filterName])
    })

    // indieweb/posse filters
    Object.keys(indiewebFilters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, indiewebFilters[filterName])
    })

    eleventyConfig.configureErrorReporting({ allowMissingExtensions: true })

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: 'public',
            includes: '_includes',
            layouts: '_layouts',
        },
    }
})
