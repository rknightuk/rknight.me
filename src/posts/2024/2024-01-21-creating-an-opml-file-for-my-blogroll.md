---
title: "Creating an OPML File for my Blogroll"
permalink: /blog/creating-an-opml-file-for-my-blogroll/index.html
date: 2024-01-21T07:10:16.416Z
excerpt: "How I'm creating OPML files for my blog, and pod, rolls so people can subscribe to all of the sites in one go"
layout: post
tags:
    - Development
    - Eleventy
    - OpenWeb
    - Podcasting
---

Last night I updated my [blogroll](/blog/roll) and [podroll](/podcasts/roll) to include a description about the sites instead of just showing the latest post; this is much more useful to someone who lands on that page. Then I realised I could add an OPML file so anyone could subscribe to all of the feeds in the roll all at once.

OPML stands for "Outline Processor Markup Language" which isn't useful to explain what it does in this context. At it's core, it's a XML document that has a list of RSS feeds you can import into a feed reader or podcast app. It looks something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
    <head>
        <title>A title</title>
        <dateCreated>Sun, 21 Jan 2024 08:13:40 +0000</dateCreated>
    </head>
    <body>
        <outline text="A Cool Blog" title="A Cool Blog" type="rss" xmlUrl="https://example.com/rss" htmlUrl="https://example.com/"/>
    </body>
</opml>
```

Each `outline` element is a feed with some attributes to describe it:

- `title` - The title of the feed/site
- `text` - This is what will be shown by feed readers when importing an OPML. This can be different to `title` but I keep them the same
- `type` - the type of feed. I'm not sure it matters if you set an Atom feed with the type set as `rss`, most feed readers will handle this anyway
- `xmlUrl` - a link to the feed
- `htmlUrl` - a link to the site

My rolls are configured with a [data file](https://www.11ty.dev/docs/data-global/):

```js
// src/_data/blogroll.js
module.exports = () => {
    return [
        {
            name: 'A Blog',
            url: 'https://example.com',
            feed: 'https://example.com/rss',
            description: 'A cool blog about things',
        },
        // the rest of the sites
    ]
}
```

To generate an OPML file from the roll in Eleventy, I added an `opml.njk` file and configured it like this:

```hbs
---
permalink: /blog/roll/opml.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
    <head>
        <title>RSS Feeds for all Robb Knight's Blogroll</title>
        <dateCreated>{% raw %}{{ page.date | dateToRfc822 }}{% endraw %}</dateCreated>
    </head>
    <body>
        {% raw %}{%- for site in blogroll -%}
            <outline text="{{ site.name }}" title="{{ site.name }}" type="rss" xmlUrl="{{ site.feed }}" htmlUrl="{{ site.url }}"/>
        {% endfor %}{% endraw %}
    </body>
</opml>
```

The `dateToRfc822` filter used in `dateCreated` is a filter provided by the [Eleventy RSS plugin](https://www.11ty.dev/docs/plugins/rss/). Then I loop through all of the sites in my blogroll and output an `outline` element for each one.

Finally I added a link to the file on each of the roll pages. Note I include a `download` attribute so browsers will (hopefull) download the file rather than show the XML file directly:

```html
<a href="opml.xml" download="download">Download the OPML file</a>
```

You can view my "rolls" here:

- [Blogroll](/blog/roll)
- [Podroll](/podcasts/roll)