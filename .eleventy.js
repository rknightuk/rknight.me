const collections = require('./config/collections.js')
const shortcodes = require('./config/shortcodes.js')

const filters = require('./config/filters/filters.js')
const dateFilters = require('./config/filters/date.js')
const indiewebFilters = require('./config/filters/indieweb.js')

const plugins = require('./config/plugins.js')
const fs = require('fs')

const { Recipe, Parser, getImageURL } = require('@cooklang/cooklang-ts')

module.exports = function(eleventyConfig) {

    eleventyConfig.addTemplateFormats("cook")

    eleventyConfig.addExtension('cook', {
        getData: async function(inputPath) {
            const content = fs.readFileSync(inputPath, 'utf-8').split('---')[2]
            const recipe = new Recipe(content)
            return {
                ingredients: recipe.ingredients,
                metadata: recipe.metadata,
                steps: recipe.steps.map(step => {
                    return step.map(s => {
                        if (s.type === 'text') {
                            return s.value
                        } else if (s.type == 'ingredient') {
                            return `<span class="cl-ingredient">${s.name.toLowerCase()}</span>`
                        } else if (s.type == 'timer') {
                            return `<span class="cl-timer">${s.quantity} ${s.units}</span>`
                        }
                    }).join('')
                }),
            }
		},
		compile: async (inputContent) => {
			return async () => {
				return inputContent
			};
		},
	})

    const markdownIt = require("markdown-it")
    const markdownItFootnote = require("markdown-it-footnote")
    const markdownItGithubAlerts = require('markdown-it-github-alerts')

    const options = {
        html: true, // Enable HTML tags in source
        breaks: true,  // Convert '\n' in paragraphs into <br>
        linkify: true // Autoconvert URL-like text to links
    };

    let markdownLib =  markdownIt(options)
        .use(markdownItFootnote)
        .use(markdownItGithubAlerts)
        
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
    ['src/assets'].forEach(path => {
        eleventyConfig.addPassthroughCopy(path)
    })

    // plugins
    plugins.forEach(plugin => {
        eleventyConfig.addPlugin(require(plugin.name), { ...plugin.options })
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
            output: 'public'
        }
    }
}
