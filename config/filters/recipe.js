const { Recipe } = require('@cooklang/cooklang-ts')
const marked = require('marked')

const makeJsonLd = (recipe) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        author: 'Robb Knight',
        recipeIngredient: recipe.ingredients.map(i => {
            return `${i.quantity }${i.units} ${i.name}`
        }),
        name: recipe.metadata.name,
        image: [
            recipe.metadata.image
        ],
        recipeInstructions: recipe.steps.map(step => {
            return {
                '@type': 'HowToStep',
                text: step.map(s => {
                    if (s.type === 'text') {
                        return s.value
                    } else if (s.type === 'ingredient') {
                        return s.name.toLowerCase()
                    } else if (s.type === 'timer') {
                        return `${s.quantity} ${s.units}`
                    } else if (s.type === 'cookware') {
                        return s.name.toLowerCase()
                    }
                }).join('')
            }
        }),
    }
}

module.exports = {
    recipeOutput: (raw) => {
        const recipe = new Recipe(raw)
        const notes = (recipe.metadata.notes || '').split('|').map(n => marked.parse(n.trim()))
        const json = makeJsonLd(recipe)
        const { image, name } = recipe.metadata
        
        delete recipe.metadata.notes
        delete recipe.metadata.name
        delete recipe.metadata.image

        return {
            json,
            name,
            image,
            cookware: recipe.cookwares,
            ingredients: recipe.ingredients,
            notes,
            metadata: Object.keys(recipe.metadata).map(key => {
                const name = key.charAt(0).toUpperCase() + key.slice(1)
                return {
                    key: name,
                    value: recipe.metadata[key]
                }
            }),
            steps: recipe.steps.map(step => {
                return marked.parse(step.map(s => {
                    if (s.type === 'text') {
                        return s.value
                    } else if (s.type === 'ingredient') {
                        return `<span class="cl-ingredient">${s.name.toLowerCase()}</span>`
                    } else if (s.type === 'timer') {
                        return `<span class="cl-timer">${s.quantity} ${s.units}</span>`
                    } else if (s.type === 'cookware') {
                        return `<span class="cl-cookware">${s.name.toLowerCase()}</span>`
                    }
                }).join(''))
            }),
        }
    }
}