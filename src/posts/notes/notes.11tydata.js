export default {
    postType: 'note',
    layout: 'posts/note',
	eleventyComputed: {
        title: '{{ date | postDate }} at {{ date | postTime }}',
        metaTitle: 'A note from the desk of Robb Knight',
        excerpt: 'A note from the desk of Robb Knight',
        subtitle: 'A note from the desk of Robb Knight',
        images: function (data) {
            return this.getImages(data)
        }
	},
}