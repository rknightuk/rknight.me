module.exports = {
    getAlmanacEmoji: (type) => {
        const emoji = {
            book: '📚',
            movie: '🍿',
            tv: '📺',
            game: '🎮',
        }
    
        return emoji[type]
    },
    getAlmanacVerb: (type) => {
        const verb = {
            book: 'Read',
            movie: 'Watched',
            tv: 'Watched',
            game: 'Finished',
        }
    
        return verb[type]
    }
}