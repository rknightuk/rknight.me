---
title: "Webmentions Redux"
permalink: /blog/webmentions-redux/index.html
date: 2024-02-16T13:05:34.143Z
excerpt: "I've rethought everything about how I show webmentions on my blog posts and switched to just showing syndicated posts instead"
layout: post
tags:
    - ActivityPub
    - Development
    - Eleventy
    - OpenWeb
---

After thinking on all the issues and [discussion around the privacy](https://social.lol/@robb/111908222268633475) of webmentions, I've re-done everything about how I show webmentions on my site, more specifically backfeeding Mastodon replies.

### Follow Up

[Chris noted in his post](https://chrismcleod.dev/blog/more-words-on-webmentions-and-backfeed/), as [pointed out by Cam](https://campegg.com/2024/02/11/over-the-last.html), that the issue we were actually talking about is _backfeed_. That is, pulling in interactions from syndicated copies of posts - in this case, my toots on Mastodon.

There were a couple of points made in the replies that were interesting. Lots of replies along the lines of "_If an ActivityPub server/instance can show replies, why can't a (non-AP) website do it?_". I agree in principle but a non-AP website won't get notified of deletions so those replies exist forever. [Nathan replied with an unlisted toot](https://sunny.garden/@knowler/111912465243280847) as a test to see what would happen and Bridgy doesn't take note of this at all. I don't know if it _should_ but "unlisted" is designed to not show a toot in the public/federated timelines so not showing as a reply seems like a reasonable assumption.

### Webmentions Version Two

[Mario Hamann's solution](https://mariohamann.com/showing-mastodon-reactions-on-a-statamic-website) of showing just the counts of replies, likes, and boosts caught my eye as a good way of handling this; no one's data is being pulled, it's clean, it's simple. Just what I was looking for.

My current implementation to show links to my posts on Mastodon was separate from my webmention fetching so I didn't have data to say "This Mastodon post is related to this blog post and has 12 likes". So I needed to pull all my Mastodon posts that include a link to one of my blog posts. I grabbed my export from the dashboard of social.lol but that export is in ActivityPub format and doesn't include reply, like, or boost counts so I switched over to [my API](https://api.rknight.me/) and added a new script. I wanted the data keyed by the blog post path so I could easily get all toots for a specific post:

```js
{
	"/blog/post-slug": {
		"12345678": {
			// toot data
		},
		"12345679": {
			// toot data
		}
	}
}
```

The script to get every one of my posts was easy enough, fetch my statuses, add them to the `dicussion` object, and page through until I've got them all:

```js
let maxId = null
let discussion = {}

while (true) {
    const res = await fetch(`https://social.lol/api/v1/accounts/109523762776095110/statuses?exclude_replies=true&limit=40&exclude_reblogs=true${maxId ? `&max_id=${maxId}` : ''}`)
    const toots = await res.json()
    if (toots.length === 0) break
    
    toots.forEach(t => {
        const urls = (extractUrls(t.content) || []).filter(url => url.includes('https://rknight.me'))
        const isSyndicate = urls.some(url => url.includes('https://rknight.me'))

        if (isSyndicate) {
                urls.forEach(url => {
                    let path = new URL(url).pathname
                    if (!path.startsWith('/blog') && OLD_URLS.includes(path)) {
                    path = `/blog${path}`
                }
                
                if (!discussion[path]) discussion[path] = {}
                discussion[path][t.id] = t
            })
        }
    })

    maxId = toots.at(-1).id
    fs.writeFileSync('./api/discussion.json', JSON.stringify(discussion, '', 2))
    await new Promise(r => setTimeout(r, 2000))
}
```

I added the 2 second timeout just so I didn't hit any rate limits (I don't know what they are and couldn't be bothered to look). Going forward I will run this script on the latest 40 toots and add them to the data which you [can see here](https://github.com/rknightuk/api/blob/main/services/discussion.js). A side note here, the `OLD_URLS` part of this code is because I recently moved all my blog posts under the `/blog` path so some posts wouldn't match otherwise.

Initially, I had a similar design to Mario but I ended up expanding it to be more of a card as if I had embedded the toot in my site manually. This is what the code looks like in `webmentions.njk`, included at the end of each post:

```hbs
{% raw %}{% if discussion[webmentionUrl] %}
    {%- set discussionData = discussion[webmentionUrl] | oValues -%}
    {%- for m in discussionData %}
        <div class="toot">
            <div class="toot__header">
                <svg class="icon mastodon-icon"><use xlink:href="#mastodon"></use></svg> <a target="_blank" href="{{ m.url }}">Discuss on Mastodon</a>
            </div>
            <div class="toot__content">{{ m.content | safe }}</div>
            <div class="toot__data">
                <div><a target="_blank" href="{{ m.url }}"><svg class="icon"><use xlink:href="#socialreply"></use></svg> {{ m.replies_count }}</a></div>
                <div><a target="_blank" href="{{ m.url }}/reblogs"><svg class="icon"><use xlink:href="#socialboost"></use></svg> {{ m.reblogs_count }}</a></div>
                <div><a target="_blank" href="{{ m.url }}/favourites"><svg class="icon"><use xlink:href="#sociallike"></use></svg> {{ m.favourites_count }}</a></div>
            </div>
        </div>
    {% endfor %}
{% endif %}{% endraw %}
```

I had to add a filter to Eleventy to run `Object.values` on the toots so I could map over them in the code:

```js
oValues: (data) => { 
	return Object.values(data)
},
```

I also include other relevant discussion links where appropriate (like HackerNews) so those are also styled to match the toot card style. The final result looks like this:

![Post Syndication](https://cdn.rknight.me/site/post-syndication.png)

This new version isn't webmentions. It doesn't check for replies or likes or boosts. This is just showing where I've posted links to my posts, or [syndication](https://indieweb.org/Category:syndication) as it's called in the indieweb world. This solves all of the privacy issues outlined in [my post](https://rknight.me/blog/mastodon-webmentions-and-privacy/) as well as ones [Wouter](https://brainbaking.com/post/2023/05/why-i-retired-my-webmention-server/), [Chris](https://chrismcleod.dev/blog/some-words-on-webmentions/), [Cam](https://campegg.com/2024/02/11/over-the-last.html), and others have mentioned.

I haven't turned off webmention collection yet. I may still come back to data to see what "proper" webmentions I get and if it's worth showing those in the future. I will be turning off the Mastodon integration that Bridgy provides though - I just don't need to be collecting those replies. 

There is one other reason to remove the old webmentions implementation: it is, quite frankly, a pain in the arse to maintain. Once it's working in theory it shouldn't break but it does on occasion. There's an ongoing bug with emojis showing as `????` which I needed to handle, along with a bunch of other edge cases.

I will miss the little grid of avatars for likes and boosts because I'm quite fond of the design, but I won't miss the complication webmentions adds to my site. Assuming everything has worked, this post should have the toot embedded below.

Update 2024-02-19: If you want an even easier way to do this, David Darnes has made [a nice web component to do it](https://darn.es/mastodon-post-web-component/) for you.