---
title: "Thinking About Recipe Formats More Than Anyone Should"
permalink: /blog/thinking-about-recipe-formats-more-than-anyone-should/index.html
date: 2024-11-04T20:23:58.764Z
excerpt: "I investigated the various standards available for storing and presenting recipes on the web"
layout: post
tags:
    - OpenWeb
    - Recipes
discuss:
- type: HackerNews
  link: https://news.ycombinator.com/item?id=42066358
  date: 2024-11-13T12:07:00
---

I've had a note in my todo list for quite a while to get my (admittedly small) collection of recipes on my website. The note mentioned to look into [Cooklang](https://cooklang.org) which is a "_recipe markup language_" but I also wanted to see if anyone knew of any other standards I should be looking at before I went ahead. I got a few responses:

- [Caleb pointed me](https://pub.calebhearth.com/@caleb/113419235283396365) to the [recipe microformat](https://pub.calebhearth.com/@caleb/113419235283396365) which he's using on [his recipes](https://calebhearth.com/spiced-mead-cake).
- [Mela](https://mela.recipes) has it's own [defined JSON format](https://mela.recipes/fileformat/index.html) sent to me by [JP](https://hachyderm.io/@byjp/113421305181124540)
- [JW](https://social.stlouist.com/@jw/113419385141696407) mentioned [RecipeML](https://en.wikipedia.org/wiki/RecipeML) which is XML (🤮)
- [Lisa mentioned](https://writing.exchange/@medievalist/113419695154729301) the format Google prefers for SEO (which I don't care about) and I tracked that down to the [Recipe schema type](https://schema.org/Recipe)
- Then there's the more obvious, not-standard-for-recipes like Markdown, generic HTML, and PDFs

I should note at this point, I started writing out how my _own_ standard might work because I am an idiot. A real [XKCD#927 moment](https://xkcd.com/927/). I stopped, I swear.

Of these I narrowed it down to two that were worth my time: Cooklang and the schema type. Recipe microformat is useful but I was looking for _how should I store these_ and not necessarily how to display them.

### Cooklang

A _very_ basic Cooklang recipe looks like this:

```cooklang
>> source: https://en.wikipedia.org/wiki/Apple
>> note: Recommended by doctor exorcists

Cut the @Apple{1} into slices. This takes ~{1%minute}. You need a #knife.
```

Ingredients are identified with `@` and quantity is defined in the brackets `{100%g}`. Timers are done with `~{10%minutes}`. Each paragraph becomes an instruction step. You can also define cookware with `#`. `>>` is the metadata. When this is run through a parser the output will be represented like so:

```json
{
  "metadata": {
    "source": "https://en.wikipedia.org/wiki/Apple",
    "note": "Recommended by doctor exorcists"
  },
  "ingredients": [
    {
      "type": "ingredient",
      "name": "Apple",
      "quantity": 1,
      "units": ""
    }
  ],
  "cookware": [
    {
      "type": "cookware",
      "name": "knife.",
      "quantity": ""
    }
  ],
  "steps": [
    [
      {
        "type": "text",
        "value": "Cut the "
      },
      {
        "type": "ingredient",
        "name": "Apple",
        "quantity": 1,
        "units": ""
      },
      {
        "type": "text",
        "value": " into slices. This takes "
      },
      {
        "type": "timer",
        "name": "",
        "quantity": 1,
        "units": "minute"
      },
      {
        "type": "text",
        "value": ". You need a "
      },
      {
        "type": "cookware",
        "name": "knife.",
        "quantity": ""
      }
    ]
  ]
}
```

The main limititation I've had when converting my recipes is if you have a recipe that is simply "mix all the ingredients" you can't list them out without them becoming instruction steps.

```cooklang
Mix all the ingredients together.

- @Butter{230%g}
- @Garlic{8-10%cloves}
- @Parsley{25%g}
```

So you _need_ to write it out like this instead:

```cooklang
Mix @Butter{230%g}, @Garlic{8-10%cloves}, and @Parsley{25%g} together.
```

Which is _fine_ but in the case of a recipe like this[^1] I would prefer to have the ingredients defined separately from the instructions. There's also no option to add multi line notes in the metadata section with `>>` but that's not a massive problem.

### Schema Recipe Type

The example Apple recipe above can be represented with JSON-LD like so:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "author": "Robb Knight",
  "cookTime": "PT1M",
  "datePublished": "2024-11-04",
  "description": "Cutting up an apple",
  "recipeIngredient": [
    "1 Apple"
  ],
  "name": "Sliced Apple",
  "recipeInstructions": [
	  "Cut the apple into slices. This takes 1 minute. You need a knife."
  ],
}
</script>
```

There are loads of other attributes available like calorie count and suitability for diet types, among others. This is the format that large recipe sites like [allrecipes](https://www.allrecipes.com) use, moreso for SEO than anything else, but I suspect the recipe extractor tools that exist are using this where they can. However, there's no world in which I'm going to write my recipes in JSON so this can't be the source format - but it _would_ make sense to also include this on a recipe page.

### Output

I wondered what this might look like on a recipe post or page. I think the solution I want is:

- Have the recipe, rendered from the cooklang file, as the content of the page. [`cooklang-ts`](https://cooklang.github.io/cooklang-ts/) will parse the file and give me back all the info I need.
- Have the raw cooklang content available so anyone can download it and use it in their own system.
- Include the JSON-LD schema on the page so recipe extractors can grab it easily.
- Mark it up with the `h-recipe` microformat.

That final point is relatively simple to implement:

```html
<article class="h-recipe">  
  <ul>
    <li class="p-ingredient">Apple (1)</li>
  </ul>
  
  <div class="e-instructions">
    <p>Cut the apple into slices. This takes 1 minute. You need a knife.</p>
  </div>
</article>
```

There's also `p-yield` for quantity produced by the recipe and `dt-duration` for how long it takes.

I think this is what I want to achieve on my site. Recipes are blog posts tagged with [#recipes](https://rknight.me/blog/tags/recipes/) and all the extra info is available if it's needed. I have a working branch of my site that adds support for `.cook` files as well as parsing the files and I'll put up a post about that when I've got it working exactly how I want.

[^1]: This is a shortened version of a garlic butter recipe, the real recipe has nine total ingredients so you can see how this would be very annoying.