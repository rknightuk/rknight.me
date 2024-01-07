---
title: Styling RSS and Atom Feeds
permalink: /blog/styling-rss-and-atom-feeds/index.html
date: 2024-01-07T15:08:15.093Z
excerpt: "Some notes on how to style RSS and Atom feeds with XSLT stylesheets"
layout: post
tags:
    - Development
    - OpenWeb
---

Styled XML? Well, I never. Look at my RSS feeds all styled and fancy:

![My RSS feed preview](https://rknightuk.s3.amazonaws.com/site/rss-feed-styled.png)

This is done with [XSLT stylesheets](https://developer.mozilla.org/en-US/docs/Web/XSLT/Element/stylesheet). A truly exciting phrase. I would recommend reading [Darek Kay's post](https://darekkay.com/blog/rss-styling/) on how to do this as well as mine. I won't be repeating everything Darek wrote in his post but I do have some additional details I wanted to note down.

To style an RSS or Atom feed you neeed to add a reference to an `xsl` file which is the styling document for the feed.

```diff
<?xml version="1.0" encoding="utf-8"?>
+ <?xml-stylesheet href="/subscribe/styles/rss.xsl" type="text/xsl"?>
```

I grabbed [`pretty-feed-v3`](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl) which is what Darek used as base for his as well. I removed all the Tailwind classes, removed the inline styles, and added a new `feeds.css` stylesheet to Eleventy. I pulled in [Andy Bell's CSS reset](https://andy-bell.co.uk/a-modern-css-reset/), my site variables, and added a few rules to make the feed look nice.

```css
@import "_reset.css"; /* https: //andy-bell.co.uk/a-modern-css-reset/ */
@import "_variables.css";

p { margin: 1em 0; }
h2, h3 { margin: 1em 0 0 0; }
a { color: var(--primary-links); }
a:hover { color: var(--offwhite); }

.rss-feed {
    padding: 10px 20px;
    background-color: var(--nearblack);
    color: var(--offwhite);
    margin: 0 auto;
    max-width: 800px;
    font-family: system-ui, sans-serif;
    font-weight: normal;
}

.nav__notice {
    background-color: var(--primary);
    color: white;
    padding: 20px;
}

.summary { font-style: italic; }
```

`pretty-feed-v3` works for RSS and Darek's example works for Atom but I _really_ didn't want to have to `xsl` files for each format. What I noticed was if a value wasn't found, it would output nothing, so I could just output the value for RSS _and_ Atom to keep it to one file. See this example with the title and description:

```xml
<h2>
    <xsl:value-of select="/rss/channel/title"/>
    <xsl:value-of select="/atom:feed/atom:title"/>
</h2>
<p>
    <xsl:value-of select="/rss/channel/description"/>
    <xsl:value-of select="/atom:feed/atom:subtitle"/>
</p>
```

Another change I wanted to make was to only show the most recent five posts, rather than all of them. A bit of digging around and I found the answer to limit `xsl:for-each` to the first five:

```xml
// atom
<xsl:for-each select="/atom:feed/atom:entry[position() &lt; 6]">

// rss
<xsl:for-each select="/rss/channel/item[position() &lt; 6]">
```

Finally to make this work with Safari, as noted in the `pretty-feed-v3` comments, the header must be set as `Content-Type: application/xml; charset=utf-8`. I added this to my Nginx config:

```nginx
location ^.xml {
  add_header "Content-Type": "application/xml; charset=utf-8";
}
```

And there we go. This is _much_ nicer than showing a generic XML file or worse like on iOS where it tries to open the file in whatever application has decided it handles feeds.