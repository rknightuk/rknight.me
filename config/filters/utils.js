export default {
	getAlmanacEmoji: (type) => {
		const emoji = {
			book: '📚',
			movie: '🍿',
			tv: '📺',
			game: '🎮',
			event: '🤘',
		}
		return emoji[type] ?? '✨'
	},
	getAlmanacVerb: (type) => {
		const verb = {
			book: 'Read',
			movie: 'Watched',
			tv: 'Watched',
			game: 'Played',
			event: 'Attended',
		}
		return verb[type]
	},
	getAlmanacImagePath: (type, file) => {
		return `/assets/catalog/almanac/${type}/${file}.jpg`
	},
	extractImages: (post) => {
		// source https://www.eddymens.com/blog/regex-get-all-images-in-a-markdown-file-js
		const regex =
			/!\[(?<altText>.*)\]\s*\((?<imageURL>.+)\)|img\s*src="(?<imageURL1>[^"]*)"\s*alt="(?<altText1>[^"]*)" \/>|img\s*alt="(?<altText2>[^"]*)"\s*src="(?<imageURL2>[^"]*)" \/>/gm
		let m
		let images = []
		while ((m = regex.exec(post.page.rawInput)) !== null) {
			if (m.index === regex.lastIndex) regex.lastIndex++
			images.push({
				alt: m.groups.altText ?? m.groups.altText1 ?? m.groups.altText2,
				url: m.groups.imageURL ?? m.groups.imageURL1 ?? m.groups.imageURL2,
			})
		}
		images = images.filter((i) => {
			return (
				i.url.includes('cdn.rknight.me') &&
				(i.url.includes('.jpg') ||
					i.url.includes('.png') ||
					i.url.includes('.gif'))
			)
		})
		return [
			...(post.attachments ?? []).filter((i) => {
				return (
					i.url.includes('cdn.rknight.me') &&
					(i.url.includes('.jpg') ||
						i.url.includes('.png') ||
						i.url.includes('.gif'))
				)
			}),
			...images,
		]
	},
}
