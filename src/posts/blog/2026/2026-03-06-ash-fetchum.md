---
title: "Ash Fetchum"
permalink: /blog/ash-fetchum/index.html
date: 2026-03-06T08:41:23.487Z
excerpt: "A library to fetch all your repositories to another machine"
tags:
    - Development
---

As I mentioned in [this post](https://rknight.me/blog/notes-on-setting-up-forgejo-on-coolify-with-ssh/) I set up Forgejo recently to move away from GitHub but one of the things that worried me was backups. I know I shouldn't blindly trust GitHub to not lose my data but it seems an unlikely situation so I've never done anything about it really. I trust myself less than that.

Of course I have backups of the server, which backs up the repositories, but I wanted a solution that meant I also had the code locally to then send to my offsite backup.

I currently have code in three code forges: GitHub, [Source Tube](https://source.tube) (which is Forgejo), and [my Forgejo instance](https://git.7622.me). My first instinct was to make a script that goes into every folder in my developer directory on my computer and fetches the changes but that wouldn't work if I made a new repository on one of the services. The ideal solution is to go through every repository on each of those services and fetch the latest changes to my machine. So I built [Ash Fetchum](https://git.7622.me/robb/ash-fetchum) and this logo that I'm very proud of (along with the name).

![A red hat like Ash from Pokémon but it has the git logo on it](https://cdn.rknight.me/site/2026/ash-fetchum-banner.jpg)

Ash Fetchum work by connecting to the GitHub or Forgejo API, fetches every repository, then cloning or fetching that repository to the defined location on your local machine, in my case `/repo-backups`. The [readme has instructions](https://git.7622.me/robb/ash-fetchum/src/branch/main/readme.md) on how to set it up and it should be relatively straight forward as long as you get the token permissions correct.

![A terminal output showing Ash Fectchum fetching changes for multiple repositories](https://cdn.rknight.me/site/2026/ash-fetchum-in-action.jpg)

It also has a "manual" mode where you can give it an array of repository remotes to keep up to date. I'm using this as bodge-job replacement for some GitHub pages deployments that I want to move away from GitHub but it could easily be used for a more defined set of repositories to backup.

[View Ash Fetchum on KnightForge](https://git.7622.me/robb/ash-fetchum).


