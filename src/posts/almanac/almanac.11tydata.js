module.exports = {
	eleventyComputed: {
        layout: 'posts/almanac',
        excerpt: function (data) {
            return this.getAlmanacDescription(data)
        }
	},
}