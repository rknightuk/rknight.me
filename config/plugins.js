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
        name: 'eleventy-plugin-youtube-embed',
        options: {
            lite: true,
            embedClass: 'youtube-embed',
        },
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