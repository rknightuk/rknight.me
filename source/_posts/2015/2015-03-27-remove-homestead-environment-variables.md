---
title: Remove Laravel Homestead Environment Variables
permalink: /remove-homestead-environment-variables
layout: post
excerpt: "How to delete envirionment variables from Laravel Homestead."
---

When you add environment variables to Laravel homestead, they get added so you can access them within your applications. The problem is, if you delete a varaible from your `homestead.yaml` file, it doesn't get deleted within Homestead. If you need to remove them, you can delete them from `php-fpm.conf` located at `/etc/php5/fpm/php-fpm.conf`.