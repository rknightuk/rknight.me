const fs = require('fs')

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
    // 'eleventy-plugin-purgecss',
]