const almanacImagePath = 

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
            game: 'Played',
        }
    
        return verb[type]
    },
    getAlmanacImagePath: (type, file) => {
        return `/assets/catalog/almanac/${type}/${file}.jpg`
    }
}