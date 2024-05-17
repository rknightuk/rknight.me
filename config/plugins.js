const fs = require('fs')
const slugify = require('slugify')

module.exports = [
    {
        name: '@11ty/eleventy-plugin-rss',
    },
    {
        name: '@11ty/eleventy-plugin-syntaxhighlight',
    },
    {
        name: '@11tyrocks/eleventy-plugin-lightningcss',
    },
    {
        name: '@11ty/eleventy-navigation',
    },
    {
        name: '@rknightuk/eleventy-plugin-post-graph',
        options: {
            textColor: 'white',
            highlightColor: 'var(--primary-subtle)',
            sort: 'desc'
        }
    }
]