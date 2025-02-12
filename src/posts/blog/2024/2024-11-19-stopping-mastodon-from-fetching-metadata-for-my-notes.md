---
title: "Stopping Mastodon From Fetching Metadata for My Notes"
permalink: /blog/stopping-mastodon-from-fetching-metadata-for-my-notes/index.html
date: 2024-11-19T13:34:28.680Z
excerpt: "How I configured nginx to block Mastodon from fetching my note pages"
tags:
    - Development
    - OpenWeb
---

I'm trying to move towards [POSSE](https://indieweb.org/POSSE) for my short/micro posts and one thing I wasn't sure about was if those short posts should link back to the source or not. I [tooted a poll about this](https://social.lol/@robb/113464032762475185):

> People who POSSE short posts do you link back to the source or not? Seems a bit redundant but also it is nice to get to the canonical source.

And the results were:

&nbsp; | &nbsp;
| ----------------------------- | --- |
| Yes I link back               | 29% |
| No I don't link back          | 21% |
| I link back if it's truncated | 15% |
| wtf is posse you weirdo       | 35% |

This was hardly a landslide victory for one specific way but I came to the conclusion I did want to link back. However, the real reason for my poll was exactly what [Kevin replied with](https://xoxo.zone/@KevinMarks/113464550398427072):

> Where it gets weird is if there's a preview of the post as well, so then you get the POSSE copy of the post, then underneath a preview showing the same text, then if you click through there's just the same text again. In that case a link back is creating a bad experience for your readers on the POSSE platform.

As an example, here is a short post with a link back to [the source](https://rknight.me/notes/202411181234/):

![A post on Mastodon showing the note, plus the image preview](https://cdn.rknight.me/site/posse-note-with-og-image.jpg)

As proud as I am of my open graph image, in this context it's superfluous[^1]. We have the content of the post "Boo! I wanted...", then a big image that tells you it's a note, then the date it was sent (which you'd know from the toot as well), then the same text as the OG image "A note from the desk...". Then if you click through you get the same text as the toot. This is no good.

I could just remove the open graph images and data all together but what if someone else links the page elsewhere? I _would_ want them in that case. So the solution is to block the Mastodon user agent from getting them when a link to one of my notes is tooted. Into the nginx config.

I only want this to apply to pages that start with `/notes` so I started with a new `location` block and thankfully Mastodon uses the aptly-named `Mastodon` user agent.

```bash
location /notes {
	if ($http_user_agent ~* "Mastodon" ) {
	}
}
```

I don't want to flat-out block Mastodon so instead I return an empty web page:

```diff
location /notes {
	if ($http_user_agent ~* "Mastodon" ) {
+		add_header Content-Type text/html;
+		return 200 '<html><body></body></html>';
	}
}
```

I added this to my nginx config and tested it in Chrome by changing the user agent (`Inspector > More Tools > Network Conditions`) and it worked - I got a blank page back. Great success. Except now no one could access _any_ notes page. I needed to update the config to have fallback logic for anything that _wasn't_ Mastodon:

```diff
location /notes {
	if ($http_user_agent ~* "Mastodon" ) {
		add_header Content-Type text/html;
		return 200 '<html><body></body></html>';
	}

+	try_files $uri $uri/ /404.html?$query_string;
}
```

With this all deployed to my server[^2], a syndicated note like [this one](https://rknight.me/notes/202411191206/) now only shows the link on Mastodon with no title, description, or image.

![A toot with a link to my site with no image or card](https://cdn.rknight.me/site/posse-note-with-no-image.jpg)

>  [!NOTE] Update
> Adam [sent me his code](https://social.lol/@adam/113510660868389993) to do it for a bunch of different fediverse servers

```diff
location /notes {
-	if ($http_user_agent ~* "Mastodon") {
+	if ($http_user_agent ~* (Mastodon|Pleroma|Akkoma|Misskey|Firefish|gotosocial|Bridgy|Friendica)) {
		add_header Content-Type text/html;
		return 200 '<html><body></body></html>';
	}
}
```

> [!NOTE] Update 2025-02-12
> [Caleb has a solution](https://calebhearth.com/prevent-microblog-link-previews) for doing the same thing in Rails

[^1]: [Adam](https://neatnik.net/) would argue they're always superfluous
[^2]: You can see how I'm keeping nginx changes in version control in [this post](https://rknight.me/blog/blocking-bots-with-nginx/)