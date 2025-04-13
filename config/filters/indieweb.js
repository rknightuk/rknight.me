import utils from './utils.js'
import { decode } from 'html-entities'
import { tootText } from '../mastodonFormatter.js'
import { DateTime } from 'luxon'

export default {
	makeTootText: (post) => {
		return tootText(post)
	},
	getTitleForOg: (post) => {
		return decode(post.data.title)
	},
	getAlmanacDescription: (data) => {
		return `An Almanac entry for ${data.title} ${utils.getAlmanacEmoji(data.mediaType)}`
	},
	getOgImageUrl: (page) => {
		if (page.attachments && page.attachments.length > 0) {
			return page.attachments[0].url
				? page.attachments[0].url
				: page.attachments[0]
		}
		let path = page.url
		if (page.permalink === '404.html') {
			path = '/404/'
		}
		if (path.startsWith('/notes/') && path !== '/notes/') {
			path = '/notes/single/'
		}
		if (path.startsWith('/almanac/') && path !== '/almanac/') {
			const d = DateTime.fromISO(page.date.toISOString()).setZone(
				'Europe/London',
			)
			if (DateTime.now().diff(d, 'days').days > 90) {
				path = '/almanac/single/'
			}
		}
		const url = encodeURIComponent(`https://rknight.me/opengraph${path}`)
		return `https://v1.screenshot.11ty.dev/${url}/opengraph/_123`
	},
	getOpengraphUrl: (inputPath) => {
		let path = inputPath
		if (path.startsWith('/notes/') && path !== '/notes/') {
			path = '/notes/single/'
		}
		const url = encodeURIComponent(`https://rknight.me/opengraph${path}`)
		return `https://v1.screenshot.11ty.dev/${url}/opengraph/_123`
	},
}
