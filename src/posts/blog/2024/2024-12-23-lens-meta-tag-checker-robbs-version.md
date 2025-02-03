---
title: "Lens: Meta Tag Checker (Robb's Version)"
permalink: /blog/lens-meta-tag-checker-robbs-version/index.html
date: 2024-12-23T15:53:34.000Z
excerpt: "Lens is my take on a meta tag checker that works exactly how I want it to"
tags:
    - Development
    - OpenWeb
project: https://lens.rknight.me
---

There are a few ways people like to check the meta tags on their sites. I previously used [Metatags.io](https://metatags.io/) but there's also [Hey Meta](https://www.heymeta.com/) and probably a lot more of them around I don't know about. But, as the old developer saying goes, none of them did exactly what I wanted so I built my own.

> [!NOTE] TL;DR
> [See Lens here](https://lens.rknight.me/).

I had previously started this project a long time ago using Netlify functions but I didn't want to be tied to Netlify so I went back to the thing I always do: PHP.

The backend is pretty stright-forward: given a URL, fetch the page then extract the meta tags using [`DOMDocument`](https://www.php.net/manual/en/class.domdocument.php). This example is simplified and doesn't have all the error handling, but you get the idea.

```php
$site = [
	'charset' => null,
	'found' => []
];

$contents = @file_get_contents($url);
$document = new \DOMDocument();
@$document->loadHTML($contents);

$metaElements = $document->getElementsByTagName('meta');

foreach (iterator_to_array($metaElements) as $mel) {
	if ($mel->getAttribute('charset')) {
        $site['charset'] = $mel->getAttribute('charset');
        $site['found'][] = 'charset';
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($site);
```

For the front end I wanted to give Alpine a try after reading [Blake's post about it](https://blakewatson.com/journal/alpinejs-for-home-cooked-apps/) - for a project like this where I mostly want to toggle some things based on data existing it was perfect. I initalise the data I need, mostly as null, then when data is fetched I can set things as ticked or filled in. For example, this is the preview card code:

```html
<div class="preview">
    <div 
        class="preview-image" 
        :style="`background-image: url(${site.image})`"
    ></div>
    <div class="preview-details">
        <div 
            class="preview-details-title" 
            x-html="site.title"
        >
                A Title
        </div>
        <div 
            class="preview-details-desc" 
            x-html="site.description"
        >
                a description
        </div>
        <div 
            class="preview-details-site" 
            x-html="site.host"
        >
            example.com
        </div>
    </div>
    <div
        class="preview-details-fediverse disabled" 
        :class="site.fediverse ? 'enabled' : 'disabled'"
    >
        <svg class="icon"><use xlink:href="#mastodon"></use></svg> 
        <div>More from this person</div>
    </div>
</div>
```

`x-html` sets the content of an element, `x-show` only shows an element if it's set, `:style` runs the rules as JS so they data can be filled from the data (in this case, the site image). 

It checks _exactly_ the things I care about and nothing more. I don't check Twitter's meta stuff because I've never used it and I suspect it's less relevant than ever now. It does check for the `fediverse:creator` tag but it doesn't verify if you've set it correctly in the Mastodon backend. It uses [Grandsans](https://simplebits.shop/products/grandsans) for the headings because it's a lovely font.

[See Lens here](https://lens.rknight.me/) and you can [view the source on GitHub](https://github.com/rknightuk/lens).