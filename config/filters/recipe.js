const recipeHandler = require('../recipeHandler')
const nunjucks = require('nunjucks')

module.exports = {
    recipeOutput: (raw) => {
        return recipeHandler.getRecipeData(raw)
    },
    recipeForFeed: (content, recipe) => {
        if (!recipe) return content
        const recipeHtml = nunjucks.render('src/_includes/recipe-core.njk', { recipeData: recipeHandler.getRecipeData(recipe) })
        return `${content} ${recipeHtml}`
    },
}