---
title: "Exporting Vinted Sold Data"
permalink: /blog/exporting-vinted-sold-data/index.html
date: 2026-05-20T10:58:13.924Z
excerpt: "A little javascript snippet to grab Vinted sales data from the website"
tags:
    - Development
---

Over the past month or so I've sold a bunch of stuff on [Vinted](https://vinted.co.uk) and I wanted to know how much I've made but Vinted don't give you that data, at least not in a nice way. They have monthly reports but that shows what you started with and ended with which only works if you don't withdraw or spend anything, which I had.

So I went to the [sold page](https://www.vinted.co.uk/my_orders?order_type=sold), scrolled the infinite scroll list until it had loaded the months worth of stuff and whipped up this snippet to take the price and title of the item and add it to the clipboard.

```js
list = document.getElementsByClassName('my-orders-content')[0]
items = Array.from(list.querySelectorAll('a .web_ui__Cell__content'))
data = items.map(i => {
	price = i.getElementsByClassName('web_ui__Text__text')[0].innerText
	title = i.getElementsByClassName('web_ui__Cell__title')[0].innerText

	return `${price} // ${title}`
}).join('\n')
copy(data)
```

The output will look something like this which I can then paste into [Numi](https://numi.app) or [Soulver](https://soulver.app/) to give me a total. Bundles don't have a useful title because that's not available on the page.

![Numi app showing sales data across three lines and a total at the end](https://cdn.rknight.me/site/2026/vinted-data-in-numi.jpg)