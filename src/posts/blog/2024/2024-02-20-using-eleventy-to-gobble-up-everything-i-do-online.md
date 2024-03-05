---
title: "Using Eleventy to Gobble Up Everything I Do Online"
permalink: /blog/using-eleventy-to-gobble-up-everything-i-do-online/index.html
date: 2024-02-21T20:47:27.981Z
excerpt: "A blog post about how my site works based on a talk I did at the Eleventy meetup"
layout: post
tags:
    - Development
    - Eleventy
---

This post is adapted from the talk I did at [the Eleventy Meetup](https://11tymeetup.dev/events/ep-18-building-community-and-online-activity/). You can also [watch the talk on YouTube](https://www.youtube.com/watch?v=e_87IF7KGgo).

This is what I look like when I try to explain how my website works:

![Me explaining how my website works](https://cdn.rknight.me/site/pepesilvia-11ty.jpg)

There are three main parts that make up this website: [Echo](https://echo.rknight.me), [my API server](https://github.com/rknightuk/api) (and Eleventy data files), and standard Markdown files.

### Echo and Custom Post Text

Echo started life as a cross-posting tool to post from an RSS feed to Micro.blog. Since then I've added support for webhooks, Mastodon, [LinkAce](https://www.linkace.org), [Omnivore](https://omnivore.app/home), and GitHub. If we take Letterboxd as an example. I [post a review](https://letterboxd.com/rknightuk/film/the-super-mario-bros-movie/) on there that gets added to [the RSS feed](http://letterboxd.com/rknightuk/rss). Echo will fetch that new review and create a new post in the git repository on GitHub, the site rebuilds, and the review now [exists as a post](/almanac/movies/2024-02-16-the-super-mario-bros-movie/). I then use Echo _again_ to read the RSS feed of my movie reviews and post that [to Mastodon](https://social.lol/@robb/111943358114444166).

![The file commited on GitHub and the post that went to Mastodon](https://cdn.rknight.me/site/git-commit-and-mastodon.jpg)

Rather than just send the title and link to Mastodon, I prefer to include some (or all) of the post content with the toot as well. To do this, I added a `makeTootText` filter and a `mastodonCounter` function which I got [from the Mastodon project](https://github.com/mastodon/mastodon/blob/5d5c0f4f4358f4349d9e2db59cf90b1f5de24e81/app/javascript/mastodon/features/compose/util/url_regex.js). This filter check the type of post it is, checks if it will fit on Mastodon's limit of 500 characters, then adds it to the `_knightposse` object in the JSON feed.

```js
"_knightposse": {
    "about": "https://rknight.me/about/colophon/",
    "text": "⭐ Apple is twisting the truth by @manton@manton.org https://www.manton.org/2024/02/16/apple-is-lying.html\n\n\"For example, to comply with the DMA’s requirements on sideloading or marketplaces, Apple could’ve chosen a system similar to installing apps from TestFlight. This would require zero new APIs for developers, just as TestFlight itself has no new APIs when building a beta version of your app.\"\n\nAnother DMA link. All of this is just gross and completely ignores what the DMA was attempting to do.\n\n📌 https://rknight.me/links/apple-is-twisting-the-truth/",
    "tags": []
},
```

At the moment I only customise [link](/links) and [Almanac](/almanac) posts so the filter returns just the title and link if the post isn't one of those types:

```js
let content = ''
const permalink = `https://rknight.me${post.permalink}`

if (!['link', 'almanac'].includes(post.layout))
{
    return `${decode(post.title)} ${permalink}`
}
```

I then use [Cheerio](https://www.npmjs.com/package/cheerio) to get all the content as plain text which I combine with the title and link to check if it will fit on Mastodon. For Almanac posts, the filter also adds year, season, or platform information as relevant:

```js
const $ = cheerio.load(`<div id="content">${decode(post.content)}</div>`)
let allText = $('#content').text().trim()

if (post.layout === 'almanac')
{
    let title = [
        _getTypeEmoji(post.type),
        `${_getVerb(post.type)}:`,
        decode(post.title),
        post.season ? `Season ${post.season}` : null,
        post.platform ? `(${post.platform})` : null,
    ].filter(t => t).join(' ')

    content = `${title} ${permalink}`

    const contentWithReview = `${content}\n\n${allText}`
    if (mastodonCount.getMastodonLength(contentWithReview).length <= 500)
    {
        content = contentWithReview
    }

    return content
}
```

For link posts, I mention the author if they have Mastodon as well as extracting any quotes so I can include those even if my full commentary won't fit:

```js
let mastoUsername = null
if (post.author.mastodon)
{
    const url = new URL(post.author.mastodon)
    mastoUsername = `${url.pathname.replace('/', '')}@${url.host}`
}

content = `⭐ ${decode(post.title)} ${mastoUsername ? `by ${mastoUsername}` : ''} ${post.link}`

$('blockquote').get().forEach(element => {
    allText = allText.replace($(element).text().trim(), `"${$(element).text().trim()}"`)
})

const contentWithAllText = `${content}\n\n${allText}\n\n📌 ${permalink}`
const firstQuote = `"${$('blockquote').first().text().trim()}"`
const contentWithFirstQuote = `${content}\n\n${firstQuote}\n\n📌 ${permalink}`

if (mastodonCount.getMastodonLength(contentWithAllText).length <= 500)
{
    content = contentWithAllText
} else if (mastodonCount.getMastodonLength(contentWithFirstQuote).length <= 500)
{
    content = contentWithFirstQuote
} else {
    content = `${content}\n\n📌 ${permalink}`
}

return content
```

In my config in [Echo](https://echo.rknight.me) I can then use that data from the JSON feed for the new post on Mastodon:

```js
{
    name: 'rknightalmanac',
    feed: 'https://rknight.me/subscribe/almanac/feed.json',
    json: true,
    skipConversion: true,
    services: [SERVICES.MASTODON],
    transform: {
        getId: presets.default.getId,
        format: (data) => {
            return {
                content: data._knightposse.text,
                date: data.date_published,
            }
        },
    },
}
```

### API Server and Data Files

I have an [API "server"](https://api.rknight.me/) of sorts which collects information on various schedules depending on the service. To call it a server is a bit misleading, it's more like a bucket of node scripts that write JSON files. It fetches from multiple services for me including [Overcast](https://overcast.fm), [Last.fm](https://www.last.fm/user/rknightuk), [Mastodon](https://social.lol/@robb), and [Brickset](https://brickset.com/sets/ownedby-rknightuk).

The schedule is set by cron jobs and uses a makefile to define which jobs run when:

```bash
monday:
	cd /home/forge/api.rknight.me; node services/lastfm.js
	cd /home/forge/api.rknight.me; node services/books.js
	cd /home/forge/api.rknight.me; node services/psn.js
	cd /home/forge/api.rknight.me; node services/tv.js
	cd /home/forge/api.rknight.me; node services/links.js
	cd /home/forge/api.rknight.me; node now/generate.js
	cd /home/forge/api.rknight.me; node now/update.js
	cd /home/forge/api.rknight.me; node utils/backup.js
sunday:
	cd /home/forge/api.rknight.me; node services/overcast/backup.js
	python3 /home/forge/api.rknight.me/services/overcast/fetcher/fetch.py
	cd /home/forge/api.rknight.me; node services/overcast/parser/run.js
	cd /home/forge/api.rknight.me; node services/overcast/now.js
	cd /home/forge/api.rknight.me; node now/generate.js
daily:
	cd /home/forge/api.rknight.me; node services/github.js
	cd /home/forge/api.rknight.me; node services/other.js
	cd /home/forge/api.rknight.me; node now/generate.js
hourly:
	cd /home/forge/api.rknight.me; node services/webmentions.js
	cd /home/forge/api.rknight.me; node services/mastodon.js
	cd /home/forge/api.rknight.me; node services/micro.js
ten:
	cd /home/forge/api.rknight.me; node services/discussion.js
```

[Brickset](https://brickset.com/) is a site for managing and tracking a Lego collection. I have somewhere around 200 sets but along with tracking them, I want to show them on my [collections page](/collections/lego) rather than linking out to my profile there. I login, fetch my set collection, then map that to a nicer format for handling in Eleventy.

```js
const { BRICKSET_USERNAME, BRICKSET_PASSWORD, BRICKSET_API_KEY } = process.env
const response = await fetch(`https://brickset.com/api/v3.asmx/login?apiKey=${BRICKSET_API_KEY}&username=${BRICKSET_USERNAME}&password=${BRICKSET_PASSWORD}`)
const body = await response.json()

if (!response.ok) return

const userHash = body.hash

const setResponse = await fetch(`https://brickset.com/api/v3.asmx/getSets?apiKey=${BRICKSET_API_KEY}&userHash=${userHash}&params={"owned":1,"pageSize":500,"orderBy":"YearFrom","orderBy":"Theme"}`)
const rawData = await setResponse.json()

// format the data
```

This data is then written out to `api/brickset.json` and pulled into my site when it's built. 

![A sample of my Lego collection](https://cdn.rknight.me/site/lego-collection-example.jpg)


Each service on the API works in a similar way: fetch the data, format it, then write it to a file. I won't go through all of them here but you can [view the source code here](https://github.com/rknightuk/api).

To give you some idea of how much I pull into my site, here is my `_data` directory. Each one of these represents either external data or hard-coded lists of things like projects:

```txt
└── data/
    ├── site/
    │   ├── config.js
    │   ├── explore.js
    │   ├── footerpages.js
    │   ├── links.js
    │   ├── production.js
    │   ├── projects.json
    │   └── save.js
    ├── adn.json
    ├── alfred.js
    ├── blogroll.js
    ├── discussion.js
    ├── fathom.js
    ├── games.json
    ├── micro.js
    ├── microboosts.js
    ├── mypodcasts.js
    ├── now.js
    ├── podcasts.js
    ├── podroll.js
    └── status.js
```

Which brings me to my next point about using data files: any page that has a list of _things_ I tend to use data files instead of writing them in the page itself. For example, my [projects page](/projects) has a large amount of projects listed so I keep a JSON data file with all the projects and render them out from that.

```js
{
	"featured": [
		{ "title": "Humonize!", "link": "https://hum.rknight.me", "desc": "Humonize forever", "image": "humonize.png" }
	],
	"current": [
		{ "title": "Alfred Workflows", "link": "/alfred-workflows", "desc": "All of my Alfred Workflows", "image": "alfred.png", "tags": ["JS", "AppleScript", "Python"] }
	],
	"podcasts": [
		{ "title": "Ruminate", "link": "https://ruminatepodcast.com", "desc": "A podcast about what's on our minds", "image": "ruminate.png", "tags": ["11ty", "Audio"] }
	],
	"profile": [
		{ "title": "omg.log cli", "link": "https://github.com/rknightuk/omglolcli", "desc": "A CLI tool for using omg.lol", "image": "omgcli.png", "tags": ["JS"] }
	],
}
```

Then in `projects.njk` I can loop through that data and output the HTML as needed:

```hbs
### Current 

<div class="cards">
{% raw %}{%- for project in site.projects.current %}{% include 'project-card.njk' %}{% endfor%}{% endraw %}
</div>
```

![Sample of the projects output](https://cdn.rknight.me/site/example-projects.jpg)

### Markdown files and the Command Line Tool

The final component of the site is markdown files. These are used for [blog posts](/blog), [link posts](/links), [media reviews in Almanac](/almanac), and the [site changelog](/log). One of the things that's difficult with different post types like this is making sure to input all the correct metadata that's required for each type. For example, a blog post looks like this with title, tags, and an excerpt:

```txt
---
title: "Using Eleventy to Gobble Up Everything I Do Online"
permalink: /blog/using-eleventy-to-gobble-up-everything-i-do-online/index.html
date: 2024-02-20T16:47:27.981Z
excerpt: "A blog post about how my site works based on a talk I did at the Eleventy meetup"
layout: post
tags:
    - Development
    - Eleventy
---
```

Link posts, on the other hand, have information about the author and the article being linked:

```txt
---
title: "Vision Accessibility on Apple Vision Pro"
permalink: /links/vision-accessibility-on-apple-vision-pro/index.html
link: https://zmknox.com/2024/02/18/vision-accessibility-on-apple-vision-pro
date: 2024-02-20T10:54:56.550Z
author: 
  name: Zach Knox
  web: https://zmknox.com
  feed: https://zmknox.com/feed.xml
  mastodon: https://snailedit.social/@zmk
---
```

To help with this, I built a CLI tool in Node. The tool uses a combination of [Commander](https://www.npmjs.com/package/commander) to create the interface, and [@inquirer](https://www.npmjs.com/package/inquirer) to ask questions and grab that data. When I run it, I am presented with a number of options:

```txt
............................................................
............................................................
..................@@@@@@@@@@@@@@,..&@@@@@,..................
..................@@@@@@@@@@@@@...@@@@@@....................
........................@@@@@@...@@@@@@.....................
.......................@@@@@@...@@@@@@......................
.....................%@@@@@*..%@@@@@*.......................
.......................@@@@@@...@@@@@@......................
........................@@@@@@...@@@@@@.....................
..................@@@@@..@@@@@@...@@@@@@....................
..................@@@@@...#@@@@@/..#@@@@@/..................
............................................................
.......................rknight.me...........................
............................................................

? What do you want to do? (Use arrow keys)
❯ Create a new post
  Create a new link post
  Create a new changelog entry
  Add a new project
  Add a new game
Create a new post
```

If I choose "Create a new post" I get asked a bunch of questions about the post including title, slug, and tags:

```txt
? What do you want to do? Create a new post
? Post title A New Post
? Post slug a-new-post
? Tags Eleventy, OpenWeb
? Select Project none
```

It then takes all this data, formats it to YAML frontmatter, and creates the file in the correct location. In this example, a file named `2024-02-21-a-new-post.md` will be created at `src/posts/blog` and the front matter will look like this:

```txt
---
title: "A New Post"
permalink: /blog/a-new-post/index.html
date: 2024-02-21T11:36:14.696Z
excerpt: ""
layout: post
tags:
    - Eleventy
    - OpenWeb
---
```

I don't ask for the excerpt on the CLI because I'm not always sure what that will be until the post is finished. This is what the (truncated) code looks for creating a new post:

```js
const title = await input({ message: 'Post title' })
const slug = await input({ message: 'Post slug', default: slugify(title) })

const slugDate = new Date().toISOString().split('T')[0]
const year = new Date().getFullYear()
const postDate = new Date().toISOString()

const tags = await checkbox({
    message: 'Tags',
    choices: [
        { name: 'ActivityPub', value: 'ActivityPub' },
        { name: 'AdventOfCode', value: 'AdventOfCode' },
        { name: 'AI', value: 'AI' },
        // the rest of my tags
    ],
})

const project = await utils.selectProject(__siteroot, {
    title: 'none',
    value: 'none',
    description: 'none',
})

let meta = `---
title: "${title}"
permalink: /blog/${slug}/index.html
date: ${postDate}
excerpt: ""
layout: post`

if (tags.length > 0)
{
    meta = `${meta}\ntags:\n${tags.map(tag => `    - ${tag}`).join('\n')}`
}

if (project.value !== 'none') {
    meta = `${meta}\nproject: ${project.link}`
}

meta = `${meta}\n---`

fs.writeFileSync(`${__siteroot}/src/posts/blog/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
```

For link posts, I input a link and the CLI tool fetches the page content, then uses [linkedom](https://github.com/WebReflection/linkedom) to find the title, author details, and RSS feed if those exist to include them in the front matter.

```js
// ask for link, slug, title, etc

const {
    title: foundTitle, author, feed, mastodon
} = await utils.fetchPageData(link, ['title', 'author', 'feed', 'mastodon'])

const meta = `---
title: "${title}"
permalink: /links/${slug}/index.html
link: ${link}
date: ${postDate}
author: 
  name: ${author ? author : ''}
  web: ${domain}
  feed: ${feed}
  mastodon: ${mastodon.join(', ')}
---`

// write the file
```

The source code for the CLI tool is [on GitHub](https://github.com/rknightuk/rknight.me/tree/master/cli).

So that's an overview how I'm pulling in all my _stuff_ from different places on the web into this site. It's kind of complicated but it works well for me. My site is [on GitHub](https://github.com/rknightuk/rknight.me) if you want to look at how I do something specific or feel free to ask me [on Mastodon](https://social.lol/@robb).