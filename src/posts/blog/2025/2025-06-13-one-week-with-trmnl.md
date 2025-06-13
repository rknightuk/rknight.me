---
title: "One Week with TRMNL"
permalink: /blog/one-week-with-trmnl/index.html
date: 2025-06-13T22:19:28.203Z
excerpt: 'I bought a TRMNL and I"m having a lot of fun with it'
tags:
    - Development
---

Last week I ordered [a TRMNL](https://usetrmnl.com). It's an 800x480 e-ink screen with a plugin system and a little kickstand.

> [!NOTE] /save
> 
> Use the code `robb15` to get $15 off. I get $5 towards another TRMNL if you use it so we both win. Except my wife who will wonder why I bought yet another thing for the house.

I bought the developer edition which gives you access to make your own plugins rather than exclusively rely on the work of others. It also means I was able to get going before it even arrived with a virtual device. The way plugins works, I was able to put together an EchoFeed plugin pretty easily to show sign ups, posts, and other things. I added an endpoint to EchoFeed and piped that into the plugin.

![A TRMNL panel showing stats from EchoFeed](https://cdn.rknight.me/site/2025/trmnl-echofeed-demo.jpg)

Assuming there's an endpoint that takes an API key for authorisation (or nothing, in the case of Mastodon), it's really simple to make plugins. The rendering is done with [Liquid](https://shopify.github.io/liquid/) which I was already familiar with. TRMNL have a [CSS framework](https://usetrmnl.com/framework) for making plugins. You don't _have_ to use it, but you probably should. The first plugin I made was one for Relay for St Jude which I mentioned in [weeknote #1951](/blog/weeknote-1951) - I'll make sure this is live and ready to go for when the campaign starts[^1].

The first version required entering your campaign URL manually (e.g. `https://titlity.com/@rknightuk/stjude2024`. I spotted an `xhrSelect` in [the docs](https://help.usetrmnl.com/en/articles/10513740-custom-plugin-form-builder) as "coming soon" but Ryan at TRMNL got it added within a few hours of me asking nicely so now I can fetch all campaigns from the API instead of expecting people to paste in their campaign URL. Very handy. For reference, I _did_ need to add the following headers on my server to get it to work:

```php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
```

I could have done a better job here but there's nothing in this particular endpoint that requires it can only be accessed by certain domains. It's fine. CORS gunna CORS.

I've also submitted three plugins since having it:

1. [Fathom Analytics](https://usetrmnl.com/recipes/89064)
2. [Mastodon](https://usetrmnl.com/recipes/89880)
3. [Stripe](https://usetrmnl.com/recipes/89809)

There's a screenshot plugin option which will take a screenshot of a webpage and show that on screen which meant I could do a proof of concept for Project Mosaic[^2].

![A TRMNL showing a grid of small pixels, all randomly colored in black and white](https://cdn.rknight.me/site/2025/trmnl-project-mosaic.jpg)

TRMNL have a [web component](https://github.com/usetrmnl/trmnl-component) which you can see in use on [this demo page](https://usetrmnl.github.io/trmnl-component/example.html). I grabbed the SVG out of it so I could make a template in Pixelmator and I can drop in a screenshot to make nice looking images to share. Their [GitHub](https://github.com/usetrmnl) has a bunch of other resources too like servers, libraries, and a [list of 3D printable mounts](https://github.com/orgs/usetrmnl/repositories). 

You can, if you choose to, host your own server instead of relying on theirs. I've installed the [Laravel version](https://github.com/usetrmnl/byos_laravel) to check it out but I haven't done much with it. It is reassuring that I _could_ run the whole stack if I wanted to. I won't, but I could.

I've wanted some kind of "screen with data" for a while and had similar thoughts to [Jachin](https://jachinrupe.name/): there are lots of other options (iPads, Raspberry Pi mirrors, Skylight) but they all have major downsides. TRMNL meets most of my requirements and I'm already considering getting another one for the kitchen[^3].

[^1]: It's basically September
[^2]: More on that soon, also codenames are always cool
[^3]: So please use my code `robb15` thanks very much