---
title: Simple Git Deploy
permalink: /simple-git-deploy
layout: post
featured: true
excerpt: "A simple method to git push to deploy."
---

This is a simple way to deploy to a remote server, more for my reference than anything else.

Create a new folder on the server and initialise a bare git repository in it.

```
mkdir /root/repos/project-name
cd /root/repos/project-name
git init --bare
```

Create a post-receive hook (`nano /hooks/post-receive`) with this as the contents:

```
#!/bin/sh
REPO=/root/repos/project-name
TMP_GIT_CLONE=/tmp/project-name
PUBLIC_DIR=/var/www/project-name

git clone $REPO $TMP_GIT_CLONE
cp -rp $TMP_GIT_CLONE/* $PUBLIC_DIR
rm -rf $TMP_GIT_CLONE
```
Make sure to create the public directory if it doesn't already exist. Then add the remote to your local repo.

```
git remote add live ssh@server:/root/repos/project-name
```
