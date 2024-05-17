module.exports = {
	eleventyComputed: {
        layout: 'almanac',
        excerpt: function (data) {
            return this.getAlmanacDescription(data)
        }
	},
}