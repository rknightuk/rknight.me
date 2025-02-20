import rss from '@11ty/eleventy-plugin-rss'
import syntaxhighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import lightningcss from '@11tyrocks/eleventy-plugin-lightningcss'
import navigation from '@11ty/eleventy-navigation'
import youtube from 'eleventy-plugin-youtube-embed'
import postgraph from '@rknightuk/eleventy-plugin-post-graph'

export default [
	{
		name: rss,
	},
	{
		name: syntaxhighlight,
	},
	{
		name: lightningcss,
	},
	{
		name: navigation,
	},
	{
		name: youtube,
		options: {
			lite: true,
			embedClass: 'youtube-embed',
		},
	},
	{
		name: postgraph,
		options: {
			textColor: 'white',
			highlightColor: 'var(--primary-subtle)',
			sort: 'desc',
		},
	},
]
