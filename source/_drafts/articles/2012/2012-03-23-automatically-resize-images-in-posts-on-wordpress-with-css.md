---
title: Automatically Resize Images in Posts on Wordpress with CSS
permalink: /automatically-resize-images-in-posts-on-wordpress-with-css/
date: 2012-03-23 16:34:08
layout: post
---

Quick tip for something that I just worked out on how to automatically resize a large image to the maximum width of your Wordpress post section: 

> 
>     .post img			{
>     			max-width: 100%;
>     			height: auto;
>     			}
>     

Simply change the .post class to the name of your post class/ID and any images larger than the size of your post section will automatically resize.