---
title: "Adding Github-Style Markdown Alerts to Eleventy"
permalink: /blog/adding-githubstyle-markdown-alerts-to-eleventy/index.html
date: 2024-06-21T11:26:37.312Z
excerpt: "How I added support for callouts/alerts to this site"
layout: post
tags:
    - Development
    - Eleventy
---

I often have occasion to come back to a blog post and add some kind of update. Maybe I changed my mind or someone offered some new information I hadn't seen at the time of writing. Up until now I would just add updates willy-nilly; sometimes they'd be at the start, sometimes the end, sometimes in bold, sometimes not. What I wanted was something standard I could use and ideally with Markdown.

[GitHub has alerts](https://github.com/orgs/community/discussions/16925) (aka callouts) Markdown support where the syntax looks like this:

```markdown
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

These different types have different colors and icons on GitHub. I figured these would be perfect for my update blocks if I could just do:

```markdown
> [!NOTE] Update 2024-06-20
> This is the update that has happened
```

Thankfully someone had made a plugin to handle this with `markdown-it`, the renderer I use for this site: [`markdown-it-github-alerts`](https://www.npmjs.com/package/markdown-it-github-alerts). I installed the package and added it to my Eleventy config:

```diff
let markdownLib =  markdownIt(options)
	.use(require("markdown-it-footnote"))
+	.use(require('markdown-it-github-alerts'))
```

I also pulled in [the CSS](https://github.com/antfu/markdown-it-github-alerts/tree/main/styles) from the package into my CSS config and made a few tweaks: I've no intention of using anything other than the `NOTE` type so I wanted the colors to match my site rather than use GitHub's colors.

![Callout](https://cdn.rknight.me/site/callout.jpg)

Finally I went and updated a bunch of old posts that had updates.