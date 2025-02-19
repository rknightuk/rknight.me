export default {
	eleventyComputed: {
        layout: 'posts/almanac',
        postType: 'almanac',
        excerpt: function (data) {
            return this.getAlmanacDescription(data)
        }
	},
}