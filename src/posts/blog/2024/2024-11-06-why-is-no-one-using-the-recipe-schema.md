---
title: "Why Is No One Using the Recipe Schema?"
permalink: /blog/why-is-no-one-using-the-recipe-schema/index.html
date: 2024-11-06T08:47:24.771Z
excerpt: "I am very confused why recipe extensions aren't using open standards that everyone supports"
layout: post
tags:
    - Development
    - OpenWeb
    - Recipes
---

While working on my recipe handling for this site as outlined in [my previous post](https://rknight.me/blog/thinking-about-recipe-formats-more-than-anyone-should/) I realised that there are many recipe-related browser extensions available so I should be able to test my schema.org markup and my microformat class locally so I downloaded a handful of the most popular ones.

And it turns out they just...don't use the schema to extract recipes? This is in the source of [one of the extensions](https://github.com/bradenzingler/recipe_extractor/blob/master/content.js):

```js
ingr_selectors = [
    '.Wrapper-dxnTBC',                          
    '.mntl-structured-ingredients__list-item',  
    '.wprm-recipe-ingredient',                  
    '.ingredient-lists > li > p',               
    '#structured-ingredients_1-0',              
    '.o-Ingredients__m-Body',                   
    '.ingredient-list > li',                         
    '.recipe__ingredients',                     
    '.Recipe__ingredient',
    '.field-ingredientstext',                   
    '.cooked-recipe-ingredients',               
    '.tasty-recipes-ingredients-body > ul > li', 
    '.recipe-ingredients__list',                
    '.recipe-ingredients > ul > li',            
    '.tasty-recipes-ingredients > div > ul > li',
    '.recipe-ingredient > ul > li',
    '.ingredients_ingredients__FLjsC > ul > li',
    '.recipe-ingredients > li',
    '.mv-create-ingredients > ul > li'
];
```

The first ten or so had comments about which site they were for and the others I assume are just generally-accepted class names for recipes. Notice the microformat class for ingredients isn't in this list (`p-ingredient`), nor is the recipe class (`h-recipe`) in the recipe selectors.

Okay so maybe the microformats isn't widely supported but _surely_ they use the scheme.org JSON where it's available? I checked a handful of recipe sites and they all have it. Nope. None of the extensions I tested or could find source code for use it.

Perhaps there's some problem with how the big sites are using it, I thought. So I ran this script on a bunch of the sites and as far as I could tell, they all use the schema correctly.

```js
const found = document.querySelectorAll('script[type="application/ld+json"]')
const data = found[0] ? JSON.parse(found[0].innerText) : null
console.log(data)

// { "@context": "https://schema.org", "@type": "Recipe", ...
```

All of these sites support it because Google forces them to, it's a requirement to be featured prominently in search results. If someone can enlighten me as to why these extensions rely on class names that presumably change all the time, I'm all ears. I'll be over in the corner whipping up a bookmarklet to extract recipes using _standards_.