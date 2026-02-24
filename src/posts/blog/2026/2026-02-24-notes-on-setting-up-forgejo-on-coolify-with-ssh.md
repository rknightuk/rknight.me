---
title: "Notes on Setting up Forgejo on Coolify with SSH"
permalink: /blog/notes-on-setting-up-forgejo-on-coolify-with-ssh/index.html
date: 2026-02-24T19:59:19.358Z
excerpt: "A handful of useful things I learnt while setting up an instance of Forgejo for myself"
tags:
    - Development
    - OpenWeb
---

For reasons that I'll write about on another post, I had occasion to setup my own instance of [Forgejo](https://forgejo.org) - "_a self-hosted lightweight software forge_", aka "We have GitHub at home". Despite having an install of [Coolify](https://coolify.io) on one of my servers which should have made this one-click, it was significantly more clicks than that.

The version in Coolify's library is version 8 where the current version is 14 - this was the start of my issues. I was able to get Forgejo running. I could create repositories, clone them and push, but only over HTTPS and not SSH. The port _should_ have been mapped correctly to make it work but something was misconfigured. SSH is never a fun thing to debug and I had lots of help from [Adam](https://neatnik.net), [Melanie]([https://](https://melkat.lol)), and [Daniel](https://www.andrlik.org) all of whom had it working on their instances without any tinkering.

As best I can tell is that between version 8 and 14 lots of things changed, as you'd expect, so changes I made to port mapping weren't applying correctly. Then I'd try a fresh install but forget other settings I needed to edit. Then I'd do it again and forget something else. I installed Forgjo from fresh at least six times before I was able to get it running and the final working version was simple: change the version to 14, change the `22222` port mapping to `2222` and _don't touch anything else_. That's it. I had seen [this GitHub issue](https://github.com/coollabsio/coolify/issues/6280) which also ended with "lol did a reinstall now it's fine" so I at least have a bit more info here.

My final docker compose file looks like this:

```yaml
services:
  forgejo:
    image: 'codeberg.org/forgejo/forgejo:14'
    environment:
      - SERVICE_URL_FORGEJO_3000
      - 'FORGEJO__server__ROOT_URL=${SERVICE_URL_FORGEJO}'
      - 'FORGEJO__migrations__ALLOWED_DOMAINS=${FORGEJO__migrations__ALLOWED_DOMAINS}'
      - 'FORGEJO__migrations__ALLOW_LOCALNETWORKS=${FORGEJO__migrations__ALLOW_LOCALNETWORKS-false}'
      - USER_UID=1000
      - USER_GID=1000
    ports:
      - '2222:22'
    volumes:
      - 'forgejo-data:/data'
      - 'forgejo-timezone:/etc/timezone:ro'
      - 'forgejo-localtime:/etc/localtime:ro'
    healthcheck:
      test:
        - CMD
        - curl
        - '-f'
        - 'http://127.0.0.1:3000'
      interval: 2s
      timeout: 10s
      retries: 15
```

### Miscelanea

The app.ini file, when installed with Docker, lives at `/data/gitea/conf/app.ini`.

You can [add robots.txt](https://www.coryd.dev/posts/2025/updating-forgejos-robotstxt), [customise the icons](https://forgejo.org/docs/next/contributor/customization/), and even the templates. These won't exist in the container under `data/gitea/public` (for robots and icons) or `data/gitea/templates` on a standard install. If you add them, they _then_ override the defaults, usually after a reboot. My updated home page template, `home.tmpl`:

```handlebars
{{template "base/head" .}}
<div role="main" aria-label="{{if .IsSigned}}{{ctx.Locale.Tr "dashboard"}}{{else}}{{ctx.Locale.Tr "home"}}{{end}}" class="page-content home">
	<div class="tw-mb-8 tw-px-8">
		<div class="center">
			<img class="logo" width="150" height="220" src="{{AssetUrlPrefix}}/img/logo.svg" alt="{{ctx.Locale.Tr "logo"}}">
			<div class="hero">
				<h1 class="ui icon header title" style="font-size: 3.5em;">
					{{AppDisplayName}}
				</h1>
				<p style="font-size:1.3em">The personal Git instance of 
                <a href="https://rknight.me">Robb Knight</a>. 
                <a href="/robb">Have a gander at the code</a>.</p>
			</div>
		</div>
	</div>
</div>
{{template "base/footer" .}}
```

Finally, not Forgejo related but noting it here anyway, to connect to the container when you're on the server (via [Cory](https://coryd.dev)), run `docker ps -a | grep forgejo` to find the Forgejo container then use the ID to connect: `docker exec -it <ID> sh`.

You can browse the code I've already moved on my Forgejo at [git.7622.me](https://git.7622.me).