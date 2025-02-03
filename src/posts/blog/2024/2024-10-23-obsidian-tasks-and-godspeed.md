---
title: "Obsidian Tasks and Godspeed"
permalink: /blog/obsidian-tasks-and-godspeed/index.html
date: 2024-10-23T20:16:52.096Z
excerpt: "I tried to use Obsidian Tasks for two weeks and it didn't work out so I'm using Godspeed now"
tags:
    - Apps
    - MacOS
---

Two weeks ago [I tooted](https://social.lol/@robb/113288632240605303):

> Lord help me I'm back on Obsidian Tasks again

I came up with a nice solution for what I wanted. Show the first todo item in each of my project files using Obsidian Tasks query language:

```js
path includes projects
group by function task.file.path.split('/')[1].replace('.md', '')
limit groups 1
not done
```

![My todo list as rendered by Obsidian Tasks](https://cdn.rknight.me/site/project-tasks.jpg)

I had to add some rules to the css to hide the note titles which are shown when you use grouping:

```css
.tasks-group-heading {
    display: none;
}

ul.plugin-tasks-query-result {
    margin-bottom: 0;
    margin-top: 0;
}

div.task-count {
    margin-top: 10px;
}
```

Turns out, this _works_ but just it doesn't work _for me_. So I deleted it all (after noting the config down because Obsidian Tasks can be complicated).

[Godspeed](https://godspeedapp.com/a/RKNIGHT25) is my best friend now. I won't attempt to go into everything Godspeed does but the UI is simple and works for my brain. Their big selling point is everything can be done with the keyboard which I like. It's also one of the reasons I signed up to [Setapp](https://go.setapp.com/invite/0jsvfx75) (expect a post about this soon). If you want to know more [Matt has a great video](https://www.youtube.com/watch?v=p8Ak_OB-oco) about Godspeed which is how I found out about it in the first place.