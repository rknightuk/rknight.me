---
title: "Installing GoToSocial on Coolify"
permalink: /blog/installing-gotosocial-on-coolify/index.html
date: 2024-11-20T21:00:33.816Z
excerpt: "Some solutions to a couple of issues I had installing GoToSocial as well as some general notes about it"
layout: post
tags:
    - ActivityPub
    - Development
---

For various reasons I had occasion this evening to give [GoToSocial](https://gotosocial.org) a try so I installed it on my server that's running [Coolify](https://coolify.io) but hit a couple of issues which I was able to work around with the help of [Lewis](https://lewisdale.dev) and [Brandon](https://wand3r.net).

First up because it's running a reverse proxy, I needed the third option in the Docker compose file.

```bash
ports:
  # - "443:8080"
  ## For letsencrypt:
  #- "80:80"
  ## For reverse proxy setups:
  - "127.0.0.1:8082:8080"
```

The second issue was GoToSocial couldn't access the database, giving this error in the logs:

```bash
sqlite ping: sqlite3: unable to open database file
```

[This GitHub issue](https://github.com/superseriousbusiness/gotosocial/issues/476) showed it was a permissions issue where the `user` specified in the docker compose isn't the one that has permissions for the `gotosocial/data` file. I could have tried to work out what the user and group was _or_ I could `chmod` my way out this problem. Guess which one I picked. In Coolify go to `Terminal` in the sidebar, choose the project GoToSocial is installed on then connect and `cd` to the directory. Then set permissions on the data directory.

```bash
$ cd /data/coolify/services/isjdbvfihsavfids/
$ chmod 777 gotosocial/data
```

I got the directory it's installed at (`/isjdbvfihsavfids`) by checking the `storage` tab on the GoToSocial service in Coolify. 

Other notes:

- `/settings` gets you to the settings page of your account.
- Default visibility of posts is "unlisted", a difference from Mastodon where it's public by default. You can change this in settings.
- Other instance-level settings (like custom CSS on profiles) can be changed in the `config.yaml` file, see [the docs on configuration here](https://docs.gotosocial.org/en/latest/configuration/).
- Making a user an admin requires restarting the server.

I'm still playing around with GoToSocial but it's looking like a good solution for what I want - something easier to maintain than Mastodon and less resource-intensive.