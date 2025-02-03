---
title: Simple Git Deploy
permalink: /blog/simple-git-deploy/index.html
excerpt: "A simple method to git push to deploy."
date: 2015-03-29T00:00:00.000Z
tags:
    - Development
---

This is a simple way to deploy to a remote server, more for my reference than anything else.

Create a new folder on the server and initialise a bare git repository in it.

```bash
mkdir /root/repos/project-name
cd /root/repos/project-name
git init --bare
```

Create a post-receive hook (`nano /hooks/post-receive`) with this as the contents:

```bash
#!/bin/sh
REPO=/root/repos/project-name
TMP_GIT_CLONE=/tmp/project-name
PUBLIC_DIR=/var/www/project-name

git clone $REPO $TMP_GIT_CLONE
cp -rp $TMP_GIT_CLONE/* $PUBLIC_DIR
rm -rf $TMP_GIT_CLONE
```
Make sure to create the public directory if it doesn't already exist. Then add the remote to your local repo.

```bash
git remote add live ssh@server:/root/repos/project-name
```
