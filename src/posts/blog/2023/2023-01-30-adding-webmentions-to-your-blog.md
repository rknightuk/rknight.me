---
title: Adding Webmentions to Your Site
permalink: /blog/adding-webmentions-to-your-site/index.html
date: 2023-01-30T00:00:00.000Z
excerpt: "Some notes on what webmentions are and how I implemented them for this site"
tags:
  - OpenWeb
  - Development
  - Eleventy
---

Right off the bat, I read the following two articles to get a sense of how to do this so I won't go over too much of the same content but rather add some thoughts of my own about the process. I would highly recommend reading both of these.

- [Adding webmentions to your static blog by Jan Monschke](https://janmonschke.com/adding-webmentions-to-your-static-blog/)
- [Using Webmentions in Eleventy by Max Böck](https://mxb.dev/blog/using-webmentions-on-static-sites/)

Also, I feel like I muddled through this to get it to work. JSON and API requests I can understand. The _how_ of webmentions I'm still a bit confused on but we will proceed nonetheless.

### What are webmentions?

[Webmentions are](https://webmention.net/):

> a simple way to notify any URL when you link to it from your site

Sounds simple enough. It's a link (or a comment, or reply, or like) to an article on my site. What I do know of webmentions from sites like [Sophie's](https://localghost.dev/) and [Zach's](https://www.zachleat.com/) is that _somehow_ I can have likes, boosts, and replies from Mastodon show up on my blog posts. 

### How though?

This bit has confused me for months (I had a note about this dated November last year). Admittedly I didn't look too far into it but pretty much every article about webmentions will link to two sites: [webmention.io](https://webmention.io/) and [Bridgy](https://brid.gy/).

#### Webmention dot io and IndieLogin

Webmention.io is:

> a hosted service created to easily receive webmentions on any web page

Webmention.io _collects_ your webmentions and exposes an API to be able to fetch these mentions but to start off you need to login which was my first hurdle: `We couldn't find any way to authenticate you using your website.`. Webmention.io uses [IndieLogin](https://indielogin.com/setup) to log you in and apparently I hadn't added `rel="me"` to any of my social links. So I added a Github link, deployed it, and was then able to login. Success.

```html
<a style="display: none;" href="https://github.com/rknightuk" rel="me">github.com/rknightuk</a>
```

Once I logged in I was presented with tags to add to my site to accept webmentions so I promptly added those:

```html
<link rel="webmention" href="https://webmention.io/rknight.me/webmention" />
<link rel="pingback" href="https://webmention.io/rknight.me/xmlrpc" />
```

At this point, this system will work for "proper" webmentions (although not added to my site yet) but what about conversations on Mastodon? That's where Bridgy comes in.

#### Bridgy

Bridgy "connects your web site to social media" according to the home page but moreso it converts conversations on social media to webmentions to send back to webmention.io.

I went ahead and signed in with my Mastodon account. After a few minutes Bridgy started showing responses to some recent Mastodon posts that had links to my blog posts. I then went back to webmention.io and there they all were. I'm not sure of the limitations of the initial scan but it only showed the last few posts I had done so I manually went and grabbed some Mastodon posts linking to my blog and put them in the "Resend for post" input box to grab some earlier responses.

### Showing Webmentions on my Site

I'm using [Eleventy data files](https://www.11ty.dev/docs/data-global/) extensively to power my [now page](https://rknight.me/automating-my-now-page/) so I knew this would be trivial to pull into my site. Because I already have my ["api"](https://github.com/rknightuk/api) I decided to fetch it there instead and _then_ pull it into my site. For the sake of simplicity assume you don't like making your life difficult and all this would exist in Eleventy (or your site of choice).

#### Fetching Mentions

Webmention.io has [an API](https://github.com/aaronpk/webmention.io#api) to fetch mentions. There are a few different endpoints but I wasn't able to work out what all the differences were so I went with the `mention.jf2` with no other options. [Source on GitHub](https://github.com/rknightuk/api/blob/main/services/webmentions.js).

```js
// this API also accepts `since_id` to only get new mentions
const response = await fetch(`https://webmention.io/api/mentions.jf2?token=${webmentionskey}&per-page=1000`);

const body = await response.json();
const newMentions = body.children
```

I've set this up to run every hour on a cron, merge new data with the existing data, and then write the data to [a JSON file](https://api.rknight.me/api/webmentions.json). Webmention.io _does_ have an option for sending a webhook when a new mention comes in (under "settings") but that might be a lot of rebuilding if a post gets popular so I'm sticking with this method for now. Then in Eleventy, I fetch this data in [`src/_data/webmentions.js`](https://github.com/rknightuk/rknight.me/blob/master/src/_data/webmentions.js).

To get this to render on my post pages, I lifted most of [Max's solution](https://mxb.dev/blog/using-webmentions-on-static-sites/) with a few changes like grouping the different types of responses together. As an aside, I still don't know what a `mention-of` webmention looks like or how one happens.

**Update 07/07/2023**

I finally got some data to see what `mention-of` gives. I decided against showing these though because at least half of them didn't exist after only ~6 months.

```json
{
    "type": "entry",
    "author": {
    "type": "card",
    "name": "",
    "photo": "",
    "url": ""
    },
    "url": "https://blog.luiscarlospando.com/coding/2023/02/hay-nuevo-sistema-de-comentarios-en-mi-blog-2/",
    "published": null,
    "wm-received": "2023-07-07T00:18:46Z",
    "wm-id": 1693400,
    "wm-source": "https://blog.luiscarlospando.com/coding/2023/02/hay-nuevo-sistema-de-comentarios-en-mi-blog-2/",
    "wm-target": "https://rknight.me/adding-webmentions-to-your-site/",
    "mention-of": "https://rknight.me/adding-webmentions-to-your-site/",
    "wm-property": "mention-of",
    "wm-private": false
}
```

```js
// .eleventy.js
eleventyConfig.addFilter('webmentionsByUrl', function(webmentions, url) {
    const allowedTypes = ['in-reply-to', 'like-of', 'repost-of']

    const data = {
        'like-of': [],
        'repost-of': [],
        'in-reply-to': [],
    }

    const hasRequiredFields = entry => {
        const { author, published, content } = entry
        return author.name && published && content
    }

    const filtered = webmentions
        .filter(entry => entry['wm-target'] === `https://rknight.me${url}`)
        .filter(entry => allowedTypes.includes(entry['wm-property']))

    filtered.forEach(m => {
        if (data[m['wm-property']])
        {
            const isReply = m['wm-property'] === 'in-reply-to'
            const isValidReply = isReply && hasRequiredFields(m)
            if (isReply)
            {
                if (isValidReply)
                {
                    m.sanitized = sanitizeHTML(m.content.html)
                    data[m['wm-property']].unshift(m)
                }

                return
            }

            data[m['wm-property']].unshift(m)
        }
    })

    return data
})
```

```js
// _templates/post.njk
{% raw %}{%- set webmentionUrl -%}{{ page.url | stripIndex }}{%- endset -%}{% endraw %}
{% raw %}{% include 'webmentions.njk' %}{% endraw %}
```

```js
// webmentions.njk
// Then the same again as this for `repost-of` and `in-reply-to`
{% raw %}{% if mentions['like-of']|length %}{% endraw %}
    <h4>Likes</h4>
    <div class="webmentions--likeboost">
        {% raw %}{%- for like in mentions['like-of'] %}{% endraw %}
            {% raw %}<a target="_blank" rel="noopener" href="{{like.author.url}}"><img src="{{like.author.photo}}" title="{{like.author.name}}"></a>{% endraw %}
        {% raw %}{% endfor%}{% endraw %}
    </div>
{% raw %}{% endif %}{% endraw %}
```

A little bit of CSS later and we have lift off:

![Webmentions example](https://cdn.rknight.me/site/webmentions.png)

You might even see some webmentions below this post if I'm lucky.
