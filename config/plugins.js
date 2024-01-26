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
    },
    {
        name: './config/eleventy-plugin-og-image',
        options: {
            outputDir: 'src/assets/ogi',
            urlPath: '/assets/ogi/',
            getOutputFileSlug: ({ svg, context }) => {
                return slugify(context.page.url, { lower: true })
            },
            satoriOptions: {
                width: 920,
                height: 480,
                fonts: [
                    {
                        name: 'Cartridge-BoldRough',
                        data: fs.readFileSync('src/assets/fonts/Cartridge-BoldRough.woff'),
                        weight: 700,
                        style: 'normal',
                    },
                    {
                        name: 'Atkinson Hyperlegible',
                        data: fs.readFileSync('src/assets/fonts/Atkinson-Hyperlegible-Bold-102.woff'),
                        weight: 700,
                        style: 'normal',
                    },
                ],
            },
        },
    }
]