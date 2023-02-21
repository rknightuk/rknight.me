const { execSync } = require('child_process')

const collections = require('./config/collections.js')
const shortcodes = require('./config/shortcodes.js')
const filters = require('./config/filters.js')
const dateFilters = require('./config/dateFilters.js')

module.exports = function(eleventyConfig) {
    // passthrough
    ['src/assets', 'src/files'].forEach(path =>
        eleventyConfig.addPassthroughCopy(path)
    )

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

    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

    eleventyConfig.on('eleventy.after', () => {
        execSync(`npx pagefind --source public --glob \"**/*.html\"`, { encoding: 'utf-8' })
    })

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: 'public'
        }
    }
}
