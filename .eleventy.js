const collections = require('./config/collections.js')
const shortcodes = require('./config/shortcodes.js')
const filters = require('./config/filters.js')
const dateFilters = require('./config/dateFilters.js')
const plugins = require('./config/plugins.js')

module.exports = function(eleventyConfig) {
    // passthrough
    ['src/assets', 'src/files'].forEach(path => {
        eleventyConfig.addPassthroughCopy(path, {
            filter: path => !path.endsWith('.css') && !path.startsWith('_')
        })
    })

    // plugins
    plugins.forEach(pluginName => {
        eleventyConfig.addPlugin(require(pluginName))
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

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: 'public'
        }
    }
}
