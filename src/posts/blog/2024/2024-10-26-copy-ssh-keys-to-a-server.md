---
title: "Copy SSH Keys to a Server"
permalink: /blog/copy-ssh-keys-to-a-server/index.html
date: 2024-10-26T13:44:37.552Z
excerpt: "Notes on setting up SSH on a fresh server"
layout: post
tags:
    - Development
---

Every time I've setup a server in the past decade the SSH keys have been set for me, most hosts I've used do this (DigitalOcean, Hetzner, etc). This week I signed up for a server with Contabo and I had to do it myself, like a caveman. [Lewis](https://lewisdale.dev) was kind enough to help because he'd done the same thing mere days before me.

Step one is to copy my key to the server using `ssh-copy-id`:

```bash
ssh-copy-id user@example.com
```

This failed for me because I didn't have a default set in my SSH config. There are two ways to handle this. One is to specify a key in the command:

```bash
ssh-copy-id -i ~/.ssh/personal_id_rsa.pub user@example.com
```

Or set a default in `~/.ssh/config`:

```bash
Host *
	IdentityFile ~/.ssh/personal_id_rsa
```

Once that's done you should be able to SSH into the server. The last step is to disable password login which is done by editing `/etc/ssh/sshd_config`:

```diff
- PasswordAuthentication yes
+ PasswordAuthentication no
```
 
Then refresh the ssh service with `sudo service ssh restart`.