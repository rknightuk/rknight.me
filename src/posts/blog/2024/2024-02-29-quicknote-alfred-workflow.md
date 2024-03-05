---
title: "QuickNote Alfred Workflow"
permalink: /blog/quicknote-alfred-workflow/index.html
date: 2024-02-29T13:08:57.986Z
excerpt: "An Alfred workflow to quickly append text to a note"
layout: post
tags:
    - Alfred
    - Development
    - MacOS
project: /alfred-workflows
---

A conversation yesterday in the [Hemispheric Views Discord](https://hemisphericviews.com/) pushed me towards an idea I'd had for a workflow for a while: type some text, append that text to a note. 

![QuickNote window](https://cdn.rknight.me/site/quicknote-window.jpg)

Don't care about the how? [Download QuickNote here](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/quicknote).

As Alfred workflows go it's pretty simple: just three objects. 

![QuickNote objects in Alfred](https://cdn.rknight.me/site/quicknote-objects.jpg)

The first is the keyword and getting the input. Typing `quicknote This is a note` will add `This is a note` to whatever file I've set in the configuration. The second script takes the input and formats it based on the settings the workflow has:

- The date can be included with a note and formatted with [day.js](https://day.js.org/docs/en/display/format)
- The output can be customised with the `{date}` and `{note}` variables so if you want the note to be added with `-` for a markdown list, you can do that

The formatting script, aside from importing day.js, is pretty small:

```js
// dayjs imported here

function run(argv)
{
    ObjC.import('stdlib');

	const input = argv[0]

	const dateFormat = $.getenv('date_format') ?? 'yyyy-mm-dd'
    const date = dayjs().format(dateFormat)
    const noteFormat = $.getenv('note_format') ?? '{note}'

    return noteFormat
        .replace(/{date}/g, date)
        .replace(/{note}/g, input)
} 
```

The last script is the one that adds the note to the file and is written in bash. This file takes into account the final setting of the workflow: should the note be appended or prepended.

```bash
# this is the formatted note from the previous script
query=$1

if [ $add_option = "start" ]; then
	echo -e "$query$(cat $quicknotefile)" > $quicknotefile 
else
	echo -e "$(cat $quicknotefile)\n$query" > $quicknotefile
fi
```

This is one of those workflows that's pretty simple and I've been meaning to build for a while but just didn't find the time to do it. I've pointed it at my "inbox" file in Obsidian to quickly add ideas and thing I need to check out.

[Download QuickNote for Alfred workflow on GitHub](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/quicknote).