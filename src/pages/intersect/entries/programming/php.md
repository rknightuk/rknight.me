---
title: PHP
eleventyNavigation:
  key: PHP
  parent: Programming
---

## NVM not Working on Deploy on Laravel Forge

Source `nvm` in the deploy script to fix this:

```bash
. ~/.nvm/nvm.sh
```