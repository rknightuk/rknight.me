module.exports = {
    posts: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse()
    },
    firstPosts: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse().slice(0, 5)
    },
    blogTags: (collectionApi) => {
        const allTags = collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse().reduce((tags, p) => {
            if (p.data.tags && Array.isArray(p.data.tags))
            {
                return [...tags, ...p.data.tags]
            }

            return tags
        }, [])

        return [...new Set(allTags)]
    }
}
