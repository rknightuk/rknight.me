---
title: Reminders Alfred Workflow
permalink: /blog/reminders-alfred-workflow/index.html
date: 2021-07-19
excerpt: "An Alfred workflow to manage Reminders on your Mac"
layout: post
tags:
    - Alfred
    - MacOS
---

NB: This workflow has been deprecated and replaced with the [Agenda Workflow](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/agenda)

tl;dr: Reminders workflow for Alfred. [Download it here](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/reminders).

There are a number of workflows available for [Alfred](https://www.alfredapp.com) to manage Reminders on the Mac and I've tried most of them; none of them do everything I want. Most of them have one of these problems:

- They don't order reminders based on due date
- You can create reminders but can't view them
- They rely on a default list for creating with no option to choose

I decided to have a go at building my own this weekend (and this evening). I tried a number of approaches including Javascript for automation (JXA) which was too slow and AppleScript which opens the app to access your reminders so is also slow. I then found [reminders-cli](https://github.com/keith/reminders-cli) which is a command line tool written in Swift. 

This tool was as close as I was able to get in terms of accessing reminders but it didn't order them by due date, and didn't allow me to view reminders from all lists, only specific ones. I cloned the repo and starting changing some stuff to do what I wanted; I've never written Swift before, so the code is _bad_. _Really bad_. I also modified the date parsing script from [alfred-reminders](https://github.com/surrealroad/alfred-reminders), which uses (an admittedly older version of) [Chrono](https://github.com/wanasit/chrono) but works for this purpose.

After a bit more wrangling of various things like bash, AppleScript, and Alfred's various features like script filters and workflow variables I was able to get something I'm happy with.

![Reminders workflow for Alfred](https://rknightuk.s3.us-east-1.amazonaws.com/site/reminders-for-alfred.png)

With this workflow you can:

- View all upcoming reminders
- View upcoming reminders from a specific list
- Mark reminders complete
- Set a default list for creating reminders (or create for a specific list)
- Create new reminders with natural language (e.g. "Lunch with John tomorrow 1pm")

[Download Reminders for Alfred](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/reminders).


