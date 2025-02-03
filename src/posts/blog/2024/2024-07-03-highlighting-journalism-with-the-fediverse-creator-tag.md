---
title: "Highlighting Journalism with the Fediverse Creator Tag"
permalink: /blog/highlighting-journalism-with-the-fediverse-creator-tag/index.html
date: 2024-07-03T12:56:44.000Z
excerpt: "A look at the new fediverse:creator tag"
tags:
    - ActivityPub
    - Development
    - OpenWeb
---

Mastodon 4.3 adds support for [a newly proposed OpenGraph tag](https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/) to identify the creator of the link, which looks like this:

```html
<meta name="fediverse:creator" content="@robb@social.lol" />
```

Mastodon (and hopefully other places in the future) will use this tag to display the author's profile [below a shared link](https://mastodon.social/@johnvoorhees@macstories.net/112718351017060922) like so:

![John's toot with the author information](https://cdn.rknight.me/site/mastodon-creator-example.jpg)

This additional data is also included in the `card` object as `authors` of the status API so third party clients can use this to display it in their apps as well:

```json
"card": {
	"url": "https://www.macstories.net/stories/ai-companies-need-to-be-regulated-an-open-letter-to-the-u-s-congress-and-european-parliament/",
"title": "AI Companies Need to Be Regulated: An Open Letter to the U.S. Congress and European Parliament",
	// the rest of the card data
	"authors": [
        {
            "account": {
                "id": "109519808056877508",
                "username": "johnvoorhees",
                "acct": "johnvoorhees@macstories.net",
		        // the rest of the author data
            }
	    }
    ]
}
```

I added support for this to [MacStories](https://macstories.net) a couple of weeks back for all posts and I've added it to my site for when this becomes available for more sites. This won't work for my site for now though:

> the feature will only show up for links to moderator-approved websites. In the future we would like to make the feature available to all without a manual review process

I _really_ like this addition though; being able to jump directly to the author of a shared link is going to be really handy.