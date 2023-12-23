---
title: Navigate Project Folders with Pick
permalink: /blog/navigate-project-folders-with-pick/index.html
date: 2023-01-19
excerpt: "Using pick to jump to a project quickly"
layout: post
tags:
  - Development
  - MacOS
---

When I started my industrial placement at Radweb nearly 10 years ago (👴), [Dan Harper](https://github.com/danharper) sent me his [bash aliases](https://github.com/danharper/dotfiles) which included a lot of handy Git ones including this one that uses [`pick`](https://github.com/mptre/pick) to list git branches. I can either do `gco`, search, and enter to checkout to that branch, or do `gco branchName` to checkout immediately to a branch:

```bash
function gco() {
    if [ $# -eq 0 ]; then
        git checkout $(git branch | pick)
    else
        git checkout "$@"
    fi
}
```

I do use [`zsh-marks`](https://github.com/martvdmoosdijk/zsh-marks) already to jump to folders I've expicitly marked (as well as jumping to the root of projects with `jump sites`) but last night while doing the `cd ..; cd project-name` dance between different projects I _hadn't_ marked I realised I could apply this same thing to my personal sites folder which as the time of this writing has 97 folders. To do this, I needed to list out the directories with `ls` and the `-1` option which tells `ls` to show one per line and just the folder name:

```bash
function site() {
    if [ $# -eq 0 ]; then
        cd ~/path/to/sites/$(ls -1 "~/path/to/sites" | pick)
    else
        cd ~/path/to/sites/"$@"
    fi
}
```

So now to jump directly to the folder for this website instead of doing `j sites` then `cd personal/rknight.me` I can simply do `site rknight.me`. You can see all my aliases in [my dotfiles on GitHub](https://github.com/rknightuk/dotfiles).
