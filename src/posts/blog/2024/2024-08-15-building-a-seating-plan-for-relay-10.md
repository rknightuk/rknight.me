---
title: "Building a Seating Plan for Relay 10"
permalink: /blog/building-a-seating-plan-for-relay-10/index.html
date: 2024-08-15T20:30:37.877Z
excerpt: "A site I built so people could know who they might be sat near at Relay's 10th anniversary live show"
tags:
    - Development
    - Eleventy
    - Podcasting
---

Within a few hours of tickets going on sale for [Relay's 10th anniversary live show](https://www.extras.relay.fm/blog/2023/8/21/celebrate-relays-10th-anniversary-in-london) last year there was a discussion in the Discord about ways to say what seats we had so other people could see who they're sitting next to[^1]. So I got on it.

> [!NOTE] Note
> The domain (lodon.lol) redirects to [the GitHub repo](https://github.com/rknightuk/lodon.lol) now, I won't be renewing it.

![lodon.lol artwork](https://cdn.rknight.me/site/lodon-image.jpg)

The first step was to recreate the seating chart for [the Hackney Empire](https://seatplan.com/london/hackney-empire-theatre/seating-plan/). I could have hard-coded this but I _really_ didn't want to so I created an object for every section (stalls, dress circle, upper circle). The widest part of the stalls is 48 seats (24 each side) but every row has a different amount of seats so I started with the following, then mapped over each row to add the "ghost" seats either side:

```js
const raw = {
	"G": 16,
	"F": 40,
	"E": 42,
	"D": 42,
	"C": 40,
	"B": 36,
	"A": 48
}

Object.keys(raw).map(key => {
	let values = Array.apply(null, Array(raw[key])).map((x, i) => i+1)

	if (raw[key] < 48)
	{
		const empty = Array.apply(null, Array((48 - raw[key])/2)).map(() => null)
		values = empty.concat(values, empty)
	}

	stalls.push({
		row: key,
		seats: values.map(v => {
			return { 
				taken: false,
				number: v,
				label: null,
				key: v ? `${key}${v}` : null,
			}
		})
	})
})
```

I also had to do some more custom objects to handle box seats and the non-standard layout of the accessible seats at the back of the stalls.

To get info on who's sitting where I setup a Google form and use the API to pull that data in on every build - I set the site to build every hour to pull in new data. The Eleventy data file pulls in the ticket data, then maps the area and seat number to a keyed object for that seat:

```js
module.exports = async function() {
	const data = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet?key=${process.env.GOOGLE_API}`)
        .then(res => res.json())
        .then(json => {
            return json
        })
	
	data.values.shift()
	const ticketData = {
        'S': {},
        'DC': {},
        'UC': {},
    }

    const levelKeys = {
        'Stalls': 'S',
        'Dress Circle': 'DC',
        'Upper Circle': 'UC',
    }

	data.values.forEach(d => {
        const key = levelKeys[d[1]]
        let link = d[4]
        if (link && !link.startsWith('http') && !link.startsWith('https'))
        {
            link = `https://${link}`
        }
        ticketData[key][d[2].replace(/\s/g,'').toUpperCase()] = {
			name: d[3],
			link: link,
			discord: d[5],
		}
	})

    return ticketData
}
```

With that data and the seat data, I output every seat for each floor.

```handlebars
{% raw %}
{%- for key in stalls.seats %}
    {%- for seat in key.seats %}
        {% if seat.labelOnly %}
            <div>{{ seat.number }}</div>
        {% elif seat.number %}
            <a 
                href="#" 
                class="{% if tickets['S'][seat.key] %}taken{% else %}free{% endif %}"
                data-seat-key="{{ seat.key }}"
                {% if tickets['S'][seat.key] %}
                    data-seat="Stalls {{ seat.key }}"
                    data-name="{{ tickets['S'][seat.key].name }}"
                    data-link="{{ tickets['S'][seat.key].link }}"
                    data-discord="{{ tickets['S'][seat.key].discord }}"
                {% endif %}
            >{{ seat.number }}</a>
        {% else %}
            <div></div>
        {% endif %}
        {% if loop.index === 15 %} <div class="number-label">{{ key.row }}</div> {% endif %}
    {% endfor%}
{% endfor%}
{% endraw %}
```

Putting all that together, I had my seating chart with taken seats highlighted in blue. Clicking on those would show the persons name, Discord username, and link to a website if they'd put one in. 

![Relay 10 Seating Plan](https://cdn.rknight.me/site/seating-plan.jpg)

A few days before the show, Kate pointed out that there was an issue with one of the floor's seating layout which I tried to fix but the convoluted system I'd used really didn't make this easy. If I was going to do this again, I'd just do the boring work of hard-coding every row of seats to get a more accurate layout. And just for fun, here's a photo from my seat at the show:

![Myke and Stephen on stage](https://cdn.rknight.me/site/relay-10-stage.jpg)

[^1]: Or whoever's head you might have to stare at. Hi Jambo 👋