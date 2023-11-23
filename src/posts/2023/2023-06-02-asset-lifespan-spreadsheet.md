---
title: Asset Lifespan Spreadsheet
permalink: /asset-lifespan-spreadsheet/index.html
date: 2023-06-02T16:22:40.119Z
excerpt: "My asset lifespan spreadsheet"
layout: post
tags:
  - Podcasting
  - MacOS
---

In [episode 20 of Hemispheric Views](https://listen.hemisphericviews.com/020) Andrew talks about his asset lifespan spreadsheet which shows the cost of an item, the date purchased, and the cost per week for said item.

I figured I'd have a crack at making my own and after some wrangling with formula in Numbers I was able to get something up and running. The key part was using the `DATEDIF` function to get how many days it has been since purchase:

```
=(cost_of_item / DATEDIF(date_purchased, todays_date, diff_type))

=(B3 / DATEDIF(B2, TODAY, "D") / 7) // for cost per week
=(B3 / DATEDIF(B2, TODAY, "M")) // for cost per month
```

Which gives me an output like this:

|A|B|C|D|E|
|---|---|---|---|---|
|**Product**|**Purchase Date**|**Cost**|**Cost Per Week**|**Cost Per Month**|
|ATH-M50X|2015-12-13|£85.60|£0.22|£0.96|

I don't know what I'm going to do with this information beyond obsess over it but I do know I'm getting my money's worth with those Audio-Technica headphones.
