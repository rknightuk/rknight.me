---
title: Popular Pages with Eleventy and Fathom Analytics
permalink: /blog/popular-pages-with-eleventy-and-fathom-analytics/index.html
date: 2023-11-24T22:42:04.013Z
excerpt: "How I'm using the Fathom API to show a list of popular blogs posts in my Eleventy site"
tags:
    - Eleventy
    - OpenWeb
    - Development
---

Now my new site design is done, I've been able to take some time to add features I've wanted for a while. In this case, I want to show popular pages based on pageviews at the end of blog posts, on the [search page](/search), and on the [404 page](/404notfound).
### Fetching Pageviews

I use [Fathom](https://usefathom.com/ref/IXCLSF) for analytics on my sites and they [have an API](https://usefathom.com/api) which is handy. If you use Plausible for your analytics you should [check out Cory's post](https://coryd.dev/posts/2023/popular-posts-widget-using-eleventy-plausible/) on the same topic for the specific API implementation. He also uses liquid rather than nunjucks which I use so if that's your jam you probably want his post instead.

To fetch the data I use [Eleventy data files](https://www.11ty.dev/docs/data-global/). You can get an API key from [your Fathom dashboard](https://app.usefathom.com/api). Also, you don't _need_ to use the [`qs`](https://www.npmjs.com/package/qs) library but it does make life a bit easier.

```js
// _data/fathom.js
const qs = require('qs')

module.exports = async function() {

	const date_from = moment().subtract(90, 'days').format('YYYY-MM-DD HH:mm')
	const date_to = moment().format('YYYY-MM-DD HH:mm')
	
	const query = qs.stringify({
		entity: 'pageview',
		entity_id: env.process.FATHOM_SITE_CODE,
		aggregates: 'pageviews',
		field_grouping: 'pathname',
		date_from,
		date_to,
		sort_by: 'pageviews:desc',
		limit: 100
	})
	
	const res = await fetch(`https://api.usefathom.com/v1/aggregations?${query}`, {
		headers: {
			'Authorization': `Bearer ${env.process.FATHOM_API_KEY}`
		}
	})
	
	const json = await res.json()
}
```

Which gives uses a response like this:

```json
[
	{
		pageviews: 100,
		pathname: '/',
	},
	{
		pageviews: 99,
		pathname: '/please-expose-your-rss/',
	},
	{
		pageviews: 98,
		pathname: '/app-defaults/',
	},
	// and so on
]
```

The first problem here is this includes pages that aren't blog posts. If you're normal and setup your site well, this is easy: filter the list to only get posts that contain `/blog` in the `pathname`:

```js
const json = await res.json()

const data = json.filter(pv => pv.pathname.includes('/blog'))
```

If you're like me and made a silly mistake many years ago and your posts live at the root of your site, you have to get a bit creative to get all the blog post paths. I'm also using `titleMap` to get the titles of the posts so I can add those to the Fathom data.

```js
const fs = require('fs')

// ...fetching fathom goes here

const files = await glob('./src/posts/blog/**/*.md')
const titleMap = {}

files.forEach(page => {
	const content = fs.readFileSync(page, 'utf8')
	const permalink = content.match(/^permalink: ?(.*$)/gm)[0].split('permalink: ')[1].replace('index.html', '')
	let title = content.match(/^title: ?(.*$)/gm)[0].split('title: ')[1]
	
	if (title.startsWith('"'))
	{
		title = title.slice(1,-1)
	}
	
	titleMap[permalink] = title
})

// titleMap = {
//	'/please-expose-your-rss/': 'Please, Expose your RSS',
//	'/app-defaults/': 'App Defaults',
// }

// filter out only blog posts
let data = json.filter(pv => {
	return Object.keys(titleMap).includes(pv.pathname)
})

// add the titles to the fathom data
data.map(pv => {
	return {
		title: titleMap[pv.pathname],
		url: pv.pathname,
		pageviews: pv.pageviews
	}
})

return data
```

This sets the `fathom` data to something like this:

```js
[
	{
		title: 'Please, Expose your RSS',
		url: '/please-expose-your-rss/',
		pageviews: 99,
	},
	{
		title: 'App Defaults',
		url: '/app-defaults/',
		pageviews: 98,
	},
	// and so on
]
```

It's worth noting you don't have to map the titles to the data inside the data file, you can do it when rendering popular posts inside a custom filter as [Cory did](https://coryd.dev/posts/2023/popular-posts-widget-using-eleventy-plausible/) which would give you access to other post attributes you have. I didn't need any of the additional attributes as I'm just outputting the title and link so I didn't bother but it's worth keeping in mind.
### Including Popular Posts

I want to include the popular pages in multiple places so an include file makes the most sense. Annoyingly, nunjucks doesn't support passing in variables to an include like liquid does so I need to define the variables before each include:

```js
{% raw  %}// all popular posts
{%- set popular = fathom | popularPosts(10) -%}
{% include 'popular_posts.njk' %}

// on a post page, exclude that post by passing in the current url
{%- set pageUrl -%}{{ page.url | stripIndex }}{%- endset -%}
{%- set popular = fathom | popularPosts(5, pageUrl) -%}
{% include 'popular_posts.njk' %}
```

`popularPosts` is an Eleventy filter I have defined in my config:

```js
// .eleventy.js

eleventyConfig.addFilter('popularPosts', (pageviews, limit, url) => {
	return pageviews
		.filter(pv => pv.url !== url) // filter out the passed in url
		.slice(0, limit) // limit to the passed-in limit
})
{% endraw  %}
```

Then the `popular_posts.njk` include looks like this:

```html
{% raw  %}// _includes/popular_posts.njk

<div>
	<h4><svg class="icon"><use xlink:href="#popular"></use></svg> Popular Posts</h4>

<ul>
	{%- for p in popular %}
		<li><a href="{{ p.url }}">{{ p.title }}</li>
	{% endfor %}
</ul>

<p><small>Analytics powered by <a href="https://usefathom.com/ref/IXCLSF">Fathom</a></small></p>

</div>
{% endraw  %}
```

And the final result (or you can look just below this post and they _should_ be there unless I broke something, or got bored and removed them 🙃). If you don't have analytics yet and want to use Fathom [my referral link](https://usefathom.com/ref/IXCLSF) will give you $10 credit - I've been using them for a quite a while and use them on all of my sites.

![Popular Posts screenshot](https://cdn.rknight.me/site/fathom-popular-posts.jpg)