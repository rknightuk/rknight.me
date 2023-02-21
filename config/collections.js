module.exports = {
    posts: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse()
    },
    firstPosts: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse().slice(0, 10)
    },
    shortcuts: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse().filter(p => {
            return p.data.title.toLowerCase().includes('shortcut')
        })
    }
}
