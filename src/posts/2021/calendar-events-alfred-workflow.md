---
title: Calendar Events Alfred Workflow
permalink: /blog/calendar-events-alfred-workflow/index.html
date: 2021-07-22T00:00:00.000Z
excerpt: "An Alfred workflow to manage calendars on your Mac"
layout: post
tags:
    - Alfred
    - MacOS
project: /alfred-workflows
---

NB: This workflow has been deprecated and replaced with the [Agenda Workflow](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/agenda)

tl;dr: Calendar events workflow for Alfred. [Download it here](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/calendar-events).

I released a [Reminders workflow](https://rknight.me/reminders-alfred-workflow/) a few days ago and while working on that I realised a lot of the code would be reusable for a version to manage calendar events. So I went at it tonight while it was too hot to sleep (it's 3am).

![Calendar Events workflow for Alfred](https://rknightuk.s3.us-east-1.amazonaws.com/site/calendar-events.png)

Like the reminders one, it uses an only-for-this-use-case CLI tool which you [can view on Github here](https://github.com/rknightuk/alfred-calendars-helper). 

One difference with this one is opening and creating events. I wanted the workflow to stand on it's own but I use Fantastical as my calender so it has two modes: one for default Calendar.app and one for Fantastical. By changing the `usefantastical` workflow variable events will be opened and created in Fantastical. This is the recommended way of using it. 

With this workflow you can:

- View upcoming events for the next 5 days (all or a specific calendar)
- Open events in Calendar.app or Fantastical
- Set a default calendar for creating events

[Download Calendar Events for Alfred](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/calendar-event).


