---
title: "Adding Cooklang Support to Eleventy Three Ways"
permalink: /blog/adding-cooklang-support-to-eleventy-two-ways/index.html
date: 2024-11-07T08:37:23.672Z
excerpt: "How I added my recipes to my blog posts with cooklang and the recipe schema"
layout: post
tags:
    - Development
    - Eleventy
    - Recipes
    - RecipeFormatSaga
---

> [!NOTE] Note
> I had already built most of this before I saw [Mat had already done this](https://www.mathew-paul.nz/posts/adding-cooklang-to-my-blog/) including making [a plugin](https://www.mathew-paul.nz/posts/adding-cooklang-to-my-blog/) available. Lesson learned, maybe Google it first.

[Cooklang](https://cooklang.org), as I wrote about in [my previous post](https://rknight.me/blog/thinking-about-recipe-formats-more-than-anyone-should/), is a markup language for recipes. I wanted to put all my recipes on my site under the `/recipes` directory which meant I needed to add support for the `.cook` files to Eleventy. I tried two methods for this then ended up with a third version where I scrapped a lot of what I did and decided to just do it in blog posts.

### Method One: Compile the Template Directly

Eleventy supports [adding custom template languages](https://www.11ty.dev/docs/languages/custom/) so adding support for the format is as simple as adding the following to my config file:

```js
eleventyConfig.addTemplateFormats('cook')

eleventyConfig.addExtension('cook', {
	compile: async (inputContent) => {
		const output = inputContent
		// parse the cooklang file
		// and return the formatted HTML
		return async () => {
			return output
		}
	},
})
```

Then I added some frontmatter to the recipes to handle title and permalinks[^1]:

```markdown
---
title: Sliced Apple
permalink: /recipes/sliced-apple/index.html
layout: base
---

>> source: https://en.wikipedia.org/wiki/Apple
>> note: Recommended by doctor exorcists

Cut the @Apple{1} into slices. This takes ~{1%minute}. You need a #knife.
```

The [`cooklang-ts`](https://cooklang.github.io/cooklang-ts/) library will parse the `.cook` file to `Recipe` object which can then be used to make the HTML. I haven't included the logic here because I went in a different direction with it but you get the idea. In the second method further down I _do_ show how to do it.

```diff
+ const { Recipe } = require('@cooklang/cooklang-ts')

compile: async (inputContent) => {
+   let output = ''
+	const recipe = new Recipe(inputContent)
+   // imagine the code here that takes
+   // the recipe and formats it to an HTML string
	return async () => {
		return output
	}
},
```

This would leave my page object looking something like this:

```js
{
	content: '<div>the formatted sliced apple recipe</div>'
}
```

### Method Two: Add to the Data Cascade

The reason I stopped with method one is I prefer my Eleventy config to return _data_ (in this case, JS objects) and for rendering to be handled by the Nunjucks templates. Creating HTML strings in JS, even with [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), just doesn't spark joy.

On the Eleventy custom templates docs page, there is a [`getData` section](https://www.11ty.dev/docs/languages/custom/#getdata-and-getinstancefrominputpath). This method "_controls if and how additional data should be retrieved from a JavaScript object to populate the Data Cascade_". This allows adding additional attributes to the page object. If we take the method one example and add in the `getData` method we get something like this:

```js
eleventyConfig.addExtension('cook', {
        getData: async function(inputPath) {
	        // read the contents of the file
            const content = fs.readFileSync(inputPath, 'utf-8').split('---')[2]
            // get the recipe object
            const recipe = new Recipe(content)
            return {
                ingredients: recipe.ingredients,
                metadata: recipe.metadata,
                // for each step, add spans and classes
                // to ingredients, timers, and cookware
                steps: recipe.steps.map(step => {
                    return step.map(s => {
                        if (s.type === 'text') {
                            return s.value
                        } else if (s.type === 'ingredient') {
                            return `<span class="cl-ingredient">${s.name.toLowerCase()}</span>`
                        } else if (s.type === 'timer') {
                            return `<span class="cl-timer">${s.quantity} ${s.units}</span>`
                        } else if (s.type === 'cookware') {
                            return `<span class="cl-cookware">${s.name.toLowerCase()}</span>`
                        }
                    }).join('')
                }),
            }
		},
		compile: async (inputContent) => {
			return async () => {
				return inputContent
			};
		},
	})
```

So my page object now looks like this - notice I'm still running `compile` so we have access to the raw cooklang content to be able to output that on the page too.

```js
{
	content: 'the raw text from the cooklang file',
	ingredients: [...],
	metadata: [...],
	steps: [...],
}
```

I set the layout of the recipes to a new layout called `recipe` which extends my base layout and added the logic for rendering the data:

```handlebars
{% raw %}<style>
    .cl-ingredient,
    .cl-timer {
        font-weight: bold;
    }
</style>

<article class="h-recipe">
    {% if metadata.note %}
        <p><em>{{ metadata.note }}</em></p>
    {% endif %}

    {% if metadata.servings %}
        <p><em>{{ metadata.servings }} Servings</em></p>
    {% endif %}

    <ul>
        {%- for ingredient in ingredients -%}
            <li>
                <span class="p-ingredient">
                    {{ ingredient.name }}
                </span> {% if ingredient.quantity != 'some' %}({{ ingredient.quantity }}{{ ingredient.units }}){% endif %}
            </li>
        {%- endfor -%}
    </ul>

    <div class="e-instructions">
        {%- for step in steps -%}
            <p>{{ step | safe }}</p>
        {%- endfor -%}
    </div>

    {% if metadata.source %}
        {% if "http" in metadata.source %}
            <p><a href="{{ metadata.source }}">Source</a></p>
        {% else %}
            <p>Source: {{ metadata.source }}</p>
        {% endif %}
    {% endif %}
</article>
{% endraw %}
```

I've included the [microformat](http://microformats.org/wiki/h-recipe) classes here as well as outputting any source and notes I've put in the metadata. I then added the raw `.cook` file into a `details` element at the bottom:

```diff
+
+	<details>
+	    <summary><code>{% raw %}{{ page.fileSlug }}{% endraw %}.cook</code></summary>
+	    <pre style="text-wrap: wrap">
+		    {% raw %}{{ content | safe }}{% endraw %}
+	    </pre>
+	</details>
</article>
```

![Sliced Apples recipe rendered on my site](https://cdn.rknight.me/site/slice-apples-screenshot.jpg)

Finally to add a list of recipes on the `/recipes` page, I added a new collection and rendered said collection, sorted by title:

```js
eleventyConfig.addCollection('recipes, () => {
	collectionApi.getFilteredByGlob("src/pages/recipes/**/*.cook")
            .sort((a,b) => (a.data.title > b.data.title) ? 1 : ((b.data.title > a.data.title) ? -1 : 0))
})
```

It was at this point I stared out the window of my office and thought to myself "what the fuck am I doing". What would the URLs be? How would I tell people about new recipes? I could make an RSS feed for them but then they need dates. What I'm describing is a blog. I already have a blog. And recipes on that blog. So I deleted the collection, deleted the `/recipes` page, and jumped into an existing recipe post to see what I could do here.

### Method Three: All of the Above but It’s Blog Posts

> I’ve done a bunch of stuff and have it working but now I’m thinking why isn’t it just blog posts and screw all this nonsense

I scrapped all the code and started coverting my [sausage roll recipe](https://rknight.me/blog/puff-pastry-sausage-roll-recipe/) to cooklang format. As I mentioned in my previous post, there's no way to have multi-line comments in the metadata and this recipe requires it, so I made the executive decision to use `|` in my notes between each "line" and I'll handle splitting this myself. The converted recipe looks like this. I added `servings` and `source` to test how they will look, those are likely to be there in other recipes but aren't actually relevant to this one.

```cooklang
>> notes: I prefer to buy sausages and remove the skin as there's a bigger variety of flavours available without having to add stuff to sausage meat myself | In the UK puff pastry comes in a standard size of 320g ([example](https://groceries.asda.com/product/pastry-dough/jus-rol-puff-pastry-ready-rolled-sheet/910000468752))

>> servings: A lot

>> source: https://example.com

Preheat the oven to 180°c. Whisk up an @Egg{1} in a bowl.

Lay the @Puff Pastry{320%g} and lay a cylinder of @Sausage Meat{450%g} about an inch thick across the pastry. Roll the pastry around that and cut it so there's just enough to cover the meat with a little bit of overlap. Do this until you run out of pastry. 

Grab your baking tray, lay down some greaseproof paper on it, then brush the tray with the eggwash. 

Cut up your long sausage roll into inch-wide smaller sausage rolls and pop them on the baking tray, seam down. Brush them with egg and pop them in the oven for ~{20-25 %minutes} until they're golden brown all over.
```

I then needed to add this to the frontmatter of the recipe blog post. Doing it this way, rather than a separate file, means that if someone just has this file the recipe is still readable.

```diff
excerpt: "A very simple recipe for making delicious sausage rolls"
tags:
    - Food
    - Recipes
+ recipe: > 
+    >> notes: I prefer to buy sausages and remove the skin as there's a bigger variety of flavours available without having to add stuff to sausage meat myself | In the UK puff pastry comes in a standard size of 320g ([example](https://groceries.asda.com/product/pastry-dough/jus-rol-puff-pastry-ready-rolled-sheet/910000468752))
// and so on
```

> [!NOTE] TIL
> To do multi-line values in YAML you can use [Folded Scalar](https://yaml.org/spec/1.2-old/spec.html#style/block/folded) / `>`.

In my post layout file I added a check for the `recipe` value and if it exists include a new `recipe.njk` file - this file will pass the data to the filter, then do the rendering. Finally I added a new filter to parse and format the recipe.

```hbs
// post.njk
{% raw %}{% if recipe %}
	{% include 'recipe.njk' %}
{% endif %}

// recipe.njk
{% set recipeData = recipe | recipeOutput %}{% endraw %}

// output as per template in method two
```

```js
eleventyConfig.addFilter('recipeOutput', (raw) => {
	const recipe = new Recipe(raw)
	return {
		cookware: recipe.cookwares,
		ingredients: recipe.ingredients,
		// and so on, the same as the filter in method two
		}),
	}
})
```

At this point, this is all rendering the same as method two but on a blog post instead - I can put my life story in the post and _then_ the recipe shows, as is tradition. The next step was to split the notes into new lines. I also ran them through a markdown parser to handle any links I might include and added an image to the recipe:

```diff
+ const marked = require('marked')
+ const notes = (recipe.metadata.notes || '').split('|').map(n => marked.parse(n.trim()))
+ delete recipe.metadata.notes // remove this from metadata

return {
	cookware: recipe.cookwares,
	ingredients: recipe.ingredients,
+	notes,
```

Next, rather than be explicit about which metadata items will show (like I do above with servings and source), I changed the `metadata` attribute so it's an array I can just map over in the template.

```diff
+ const image = recipe.metadata.image

notes: (recipe.metadata.notes || '').split('|').map(n => marked.parse(n.trim()))
- metadata: recipe.metadata,
+ metadata: Object.keys(recipe.metadata).map(key => {
+	const name = key.charAt(0).toUpperCase() + key.slice(1)
+	return {
+		key: name,
+		value: recipe.metadata[key]
+	}
+ }),
+ image,
```

The notes and metadata then get output in my alert component (I added a new `kitchen` icon for this).

```hbs
{% raw %}{% if recipeData.notes.length > 1 or recipeData.metadata.length > 1 %}
	<aside class="alert">
		<div class="alert-icon">
			<svg class="icon alert-recipe">
				<use xlink:href="#kitchen"></use>
			</svg>
		</div>
			{%- for note in recipeData.notes -%}
				{{ note | safe }}
			{%- endfor -%}
			{%- for meta in recipeData.metadata -%}
				{% if meta.key === 'Source' and "http" in meta.value %}
					<p><a href="{{ recipeData.metadata.source }}">Source</a></p>
				{% else %}
					<p>{{ meta.key }}: {{ meta.value | safe }}</p>
				{% endif %}
			{%- endfor -%}
	</aside>
{% endif %}{% endraw %}
```

![Recipe metadata](https://cdn.rknight.me/site/recipe-metadata-with-icon.jpg)

For the raw recipe output, I updated that to use the syntax highlighting like the rest of the site does.

```hbs
{% raw %}{% highlight "js" %}
	{% highlight "cooklang" %}
        {{ recipe | safe }}
    {% endhighlight %}
{% endhighlight %}{% endraw %}
```

#### JSON-LD

I also want to include the recipe schema markup on the page even though [none of the recipe extensions use it](https://rknight.me/blog/why-is-no-one-using-the-recipe-schema/). The first thing I realised is that my recipes don't have a name (I was relying on the blog post for that), so I added that to the recipe.

```diff
+ >> name: Puff Pastry Sausage Rolls
```

Then I added a new `makeJsonLd` function to my recipe filter, pass it the recipe object, and output it on the page.

```js
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
```

```hbs
<script type="application/ld+json">
    {% raw %}{{ recipeData.json | dump | safe }}{% endraw %}
</script>
```

With all of this together plus some additional styling tweaks, a recipe on a blog post looks like this:

![The final output of the recipe page](https://cdn.rknight.me/site/recipe-final-output.jpg)

The last job was to convert the other recipes into cooklang format and update the posts, which was not as fun as it sounds. Going forward I'll be adding new recipes as blog posts[^2] and you'll be able to see them all under the [#recipes](https://rknight.me/blog/tags/recipes/) tag.

Ideally I would like the recipe to render _before_ the footnotes of a post but that would require digging into the markdown plugins to inject it so I decided to live with it for now. 

Below is the code in full of the filter and template or you can browse the latest code for the site [on GitHub](https://github.com/rknightuk/rknight.me/)

<details>

<summary>The recipe filter (<code>recipe.js</code>)</summary>

```js
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
```

</details>

<details>

<summary>The recipe template (<code>recipe.njk</code>)</summary>

```hbs
{% raw %}{% set recipeData = recipe | recipeOutput %}

<style>
    .cl-ingredient,
    .cl-timer {
        font-weight: bold;
    }
</style>

<article class="h-recipe recipe">

    {% if recipeData.image %}
        <img src="{{ recipeData.image }}" class="u-photo" style="margin-bottom: 20px;">
    {% endif %}
    
    {# {% if recipeData.notes.length > 1 or recipeData.metadata.length > 1 %} #}
        <aside class="alert">
            <div class="alert-icon">
                <svg class="icon alert-recipe">
                    <use xlink:href="#kitchen"></use>
                </svg>
            </div>
            <h1>{{ recipeData.name }}</h1>
            {%- for note in recipeData.notes -%}
                {{ note | safe }}
            {%- endfor -%}
            {%- for meta in recipeData.metadata -%}
                {% if meta.key === 'Source' and "http" in meta.value %}
                    <p><a href="{{ recipeData.metadata.source }}">Source</a></p>
                {% else %}
                    <p>{{ meta.key }}: {{ meta.value | safe }}</p>
                {% endif %}
            {%- endfor -%}
        </aside>
    {# {% endif %} #}

    <ul>
        {%- for ingredient in recipeData.ingredients -%}
            <li>{% if ingredient.quantity != 'some' %}{{ ingredient.quantity }}{{ ingredient.units }} {% endif %}<span class="p-ingredient">{{ ingredient.name }}</span></li>
        {%- endfor -%}
        {%- for cookware in recipeData.cookware -%}
            <li>{{ cookware.name }}</span></li>
        {%- endfor -%}
    </ul>

    <div class="e-instructions">
        {%- for step in recipeData.steps -%}
            <p>{{ step | safe }}</p>
        {%- endfor -%}
    </div>
</article>

<details>
    <summary><code>{{ recipeData.name }}.cook</code></summary>
    {% highlight "cooklang" %}
        {{ recipe | safe }}
    {% endhighlight %}
</details>

<script type="application/ld+json">
    {{ recipeData.json | dump | safe }}{% endraw %}
</script>
```

</details>

[^1]: Eleventy makes permalinks automatically based on the folder structure but I prefer to be explicit about it
[^2]: Maybe next week can be recipe week