const collections = require('./config/collections.js')
const shortcodes = require('./config/shortcodes.js')
const filters = require('./config/filters.js')
const dateFilters = require('./config/dateFilters.js')
const plugins = require('./config/plugins.js')
const EleventyPluginOgImage = require('./config/eleventy-plugin-og-image')
const fs = require('fs')

module.exports = function(eleventyConfig) {

    const markdownIt = require("markdown-it")
    const markdownItFootnote = require("markdown-it-footnote")

    const options = {
        html: true, // Enable HTML tags in source
        breaks: true,  // Convert '\n' in paragraphs into <br>
        linkify: true // Autoconvert URL-like text to links
    };

    let markdownLib =  markdownIt(options).use(markdownItFootnote)
    // replace the stupid emoji
    markdownLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
        var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)

        if (tokens[idx].meta.subId > 0) {
            id += ':' + tokens[idx].meta.subId
        }

        return ' <a href="#fnref' + id + '" class="footnote-backref">&#10558;</a>'
    }

    eleventyConfig.setLibrary('md', markdownLib);

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

    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        outputDir: 'src/assets/ogi',
        urlPath: '/assets/ogi/',
        satoriOptions: {
            fonts: [
                {
                    name: 'Cartridge-BoldRough',
                    data: fs.readFileSync('src/assets/Cartridge-BoldRough.woff'),
                    weight: 700,
                    style: 'normal',
                },
                {
                    name: 'Atkinson Hyperlegible',
                    data: fs.readFileSync('src/assets/Atkinson-Hyperlegible-Bold-102.woff'),
                    weight: 700,
                    style: 'normal',
                },
            ],
        },
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

    eleventyConfig.watchIgnores.add('src/assets/ogi/**/*')

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: 'public'
        }
    }
}
