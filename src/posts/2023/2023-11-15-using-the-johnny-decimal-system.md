---
title: Using the Johnny Decimal System
permalink: /using-the-johnny-decimal-system/index.html
date: 2023-11-15T18:09:17.596Z
excerpt: "I finally found some time to dig into the Johnny Decimal system and reorganise all my files"
layout: post
---

In [episode 028 of Hemispheric Views](https://listen.hemisphericviews.com/025) [Andrew](https://canion.blog) mentioned the [Johnny Decimal (JD) system](https://johnnydecimal.com) for organising files. I made a note of it as a thing to look into. Then, like a lot of things, I never went back to investigate. Then in [episode 096](https://listen.hemisphericviews.com/096) they had Mr Johnny Decimal himself on to talk about the system. This was the kick I needed to properly check it out. I also spoke with [John](https://mastodon.macstories.net/@johnvoorhees) about the JD system on the two most recent episodes of Ruminate if audio is more your thing.

- [172 - Big Knowledge Boys](https://ruminatepodcast.com/172/)
- [173 - Should This Be a Blog Post?](https://ruminatepodcast.com/173/)

Before we get into it, the JD system has concepts that are worth knowing about for any of this to make sense:

- Categories - these are the top level of the folder system, e.g. `10-19 Family`
- Areas - These are the folders _inside_ categories, e.g. `10 Finance`
- IDs or Items - These are the actual files that exist inside of areas, e.g. `10.01 Insurance`
### Attempt One

I skimmed through the [beautiful website](https://johnnydecimal.com) to get a sense of what the "rules" are for the system and starting coming up with my categories. Note I use the word "skimmed" there because I got this _very_ wrong; my categories were too narrow and my areas were too broad to make any sense. Johnny was kind enough [in the JD Discord](https://johnnydecimal.com/20-29-communication/23-forums-and-chat/23.02-discord/) to give me some feedback after I clearly rushed though and didn't pay enough attention to the website. I'll just go over two of them here:

<details>
	<summary>00-09 System</summary>
	<pre>00-09 System
│ 00 Inbox
│ 01 Exported Data
│ ├── 01.01 Twitter
│ ├── 01.02 Tumblr
│ ├── 01.03 Instagram
│ ├── 01.04 Mastodon
│ ├── 01.05 Reddit
│ ├── 01.06 Project Databases
│ ├── 01.07 Other
│ 02 Education Archive
│ ├── 02.01 College
│ ├── 02.02 Uni
│ ├── 02.03 School
│ 03 Sites Archive
│ ├── 03.01 Just Delete Me (JDM)
│ ├── 03.02 Wordpress Themes
│ ├── 03.03 Personal
│ ├── 03.04 Freelance
│ ├── 03.05 DevsDoDesign
│ 09 Archive
│ ├── 09.01 Archive
│ ├── 09.02 Camera Uploads
	</pre>
</details>

> I think all archives can just become 09 archive. it doesn’t feel like you have anywhere near 99 things you’ll ever put in there? fill ‘er up baby

In this case, I was trying to organise too hard. As Johnny pointed out, for an archive it really doesn't matter how much stuff is in there. Fill 'er up baby indeed.

<details>
	<summary>40-49 Games</summary>
	<pre>40-49 Games
│ 40 Screenshots
│ 41 Manuals
│ 42 ROMs
</pre>
</details>

> that’s a nice clear area, perhaps it doesn’t need its own area and could just be a category elsewhere though? do you see it filling up with time, or is this it? if this is it it’s a ‘waste’ of an area as it is

> I mean you have 10 to use, it’s not like it’s a crime…I’ve just learned over the years that compression tends to better results

This category was far too specific. This is 10 years worth of stuff, it's unlikely I'm going to suddenly have a huge influx in new areas of things for this.

Johnny also offered some other advice about my other categories but the general gist was I hadn't quite _got it_. So I dug into the book (which Johnny kindly sent me).

### The Workbook

The JD Workbook is a 110-page ebook designed to "_guide you through the entire process of setting up your own Johnny.Decimal system_". There are also videos at the end of each section which go over everything in that chapter. I found these useful particularly seeing how Johnny does his index in [Bear](https://bear.app).

Johnny gave me this advice before starting the workbook, in reference to his previous comments:

> I’d really like to see the results after a workbook-doin’. When you do that, try to forget all of this.

I read the book twice, once just reading and the second time while taking notes about what I thought my areas and categories should look like. I started by creating a new directory in my iCloud Drive, created folders, then used [tree](http://mama.indstate.edu/users/ice/tree/) to see the folder structure in plain text:

```bash
tree -L 3 -d
# -L 3 for how many levels deep
# -d for directories only

├── 00-09 System
│   ├── 00 Index
│   │   └── 00.01 Index Files
│   ├── 01 Exported Data
# ...and so on
```

I even printed out the worksheets from the back of the book as suggested by Johnny. I found the process really helpful to actually write down with pen and paper rather than into Obsidian or some other note taking app.

### The Index

Before reading the book I didn't really understand the need for [the index](https://johnnydecimal.com/10-19-concepts/11-core/11.05-the-index/). I get it now. The index is the source of truth for the location of items **and** any additional notes or tasks related to the item. The index is a list of all of your JD IDs stored in some kind of note app, in my case Obsidian. After watching the video on the index, I realised that the part that would be useful to me was adding notes _about_ the files in my IDs. So each ID has a corresponding note. For example, I have a folder called `30-39 Resources/30 Fonts/30.02 Media Fonts` and in my index Obsidian vault I have a note called `30.02 Media Fonts.md`. This note contains the following link to [the source](https://www.fontspace.com/london-tube-font-f2717) of the `London Tube.otf` font:

```txt
London Tube Font: https://www.fontspace.com/london-tube-font-f2717
```

I have found being to add additional notes about a certain items really helpful. In the past I would have the files for something like applying for a mortgage in Finder and then a separate note in Obsidian with things like dates and expected timelines but those two things didn't know anything about each other. Using the index links those things together: if I need to find out information about applying for the mortgage, I open up `11.04 Mortgage.md` and can see any notes and tasks that need to be done. And based on the ID I know that it it's stored in `10-19 Family/11 Finance/11.04 Mortgage`. The index is also the place t start when a new project or file doesn't have a home. 

As a slight aside and a little outside the spirit of the deliberate nature of the JD system, I didn't actually create the notes in Obsidian until I was mostly done with the folders and files themselves. I built this little script to make the files for me instead:

```bash
#!/bin/bash

output="/path/to/obsidian/vault"

# put a list of folders names here
files=(
"50.01 Audio Books"
"50.02 Comics"
"50.03 Ebooks"
)

for f in "${files[@]}"; do
    touch "$output/$f.md"
done
```

After reading the workbook for the second time and thinking some more about my structure, this is where it's at as of today:

<details>
	<summary>JD System Structure</summary>
	<pre>00-09 System
| 00 Index
│ ├── 00.01 Index Files
| 01 Exported Data
│ ├── 01.01 Twitter
│ ├── 01.02 Tumblr
│ ├── 01.03 Instagram
│ ├── 01.04 Mastodon
│ ├── 01.05 Reddit
│ ├── 01.06 Project Databases
│ ├── 01.07 Other
│ ├── 01.08 TwitPic
| 09 Archive
│ ├── 09.01 Archive
│ ├── 09.02 Camera Uploads
│ ├── 09.03 DevsDoDesign
│ ├── 09.04 Freelance
│ ├── 09.05 Just Delete Me (JDM)
│ ├── 09.06 Personal Sites
│ ├── 09.07 Wordpress Themes
│ ├── 09.08 College
│ ├── 09.09 Uni
│ ├── 09.10 School
│ ├── 09.11 Talks
│ ├── 09.12 Artwork
10-19 Home and Family
| 10 Products
│ ├── 10.01 Washing Machine
│ ├── 10.02 Dishwasher
│ ├── 10.03 Freezer
│ ├── 10.04 Oven
│ ├── 10.05 Microwave
│ ├── 10.06 TV
│ ├── 10.07 Electronics
| 11 Finance
│ ├── 11.01 Mortgage
│ ├── 11.02 Insurance
│ ├── 11.03 Credit Cards
│ ├── 11.04 Loans
│ ├── 11.05 Monzo Pots
| 12 Building Work
│ ├── 12.01 Floorplans and Layouts
│ ├── 12.02 Photos
│ ├── 12.03 Kitchen
│ ├── 12.04 Utility Room
│ ├── 12.05 Bathroom
| 13 Purchases
│ ├── 13.01 123 House Street
│ ├── 13.02 456 House Road
| 14 Legal
│ ├── 14.01 Work
│ ├── 14.02 Deaths
│ ├── 14.03 Deed Poll
│ ├── 14.04 Payslips
│ ├── 14.09 [redacted]
20-29 Podcasts
| 20 Ruminate
│ ├── 20.00 Recordings
│ ├── 20.01 Episodes
│ ├── 20.02 Artwork
│ ├── 20.03 Sounds
│ ├── 20.04 Shownotes
│ ├── 20.05 Episode Art
| 21 We Got Family
│ ├── 21.00 Recordings
│ ├── 21.01 Episodes
│ ├── 21.02 Artwork
│ ├── 21.03 Sounds
│ ├── 21.04 Shownotes
│ ├── 21.05 Episode Art
| 22 Follow Out
│ ├── 22.01 Appearances
│ ├── 22.02 Mentions
│ ├── 22.03 Fan Art
| 23 Show Archives
│ ├── 23.01 The Ricky Gervais Show
│ ├── 23.02 Bionic and Bonanza
│ ├── 23.03 Cooking With Brett and Myke
│ ├── 23.03 Futurama
│ ├── 23.04 Hello Internet
30-39 Resources
| 30 Fonts
│ ├── 30.01 Coding
│ ├── 30.02 Media
│ ├── 30.03 Symbols
│ ├── 30.04 Others
| 31 Icons
│ ├── 31.01 General Use
│ ├── 31.02 Niche
| 32 Music and Sounds
│ ├── 32.01 Clips
│ ├── 32.02 Royalty Free Music
│ ├── 32.03 Blahaj
| 33 Books
│ ├── 33.01 Audio Books
│ ├── 33.02 Comics
│ ├── 33.03 Dev
│ ├── 33.04 eBooks
│ ├── 33.05 Lego
40-49 Hobbies
| 40 Games
│ ├── 40.01 Screenshots
│ ├── 40.02 Manuals
│ ├── 40.03 ROMs
| 41 Lego
│ ├── 41.01 Manuals
│ ├── 41.02 Photos
│ ├── 41.03 MOC
│ ├── 41.04 Comic Con Exclusives
| 42 Raspberry Pi
│ ├── 42.01 PiSight
│ ├── 42.02 Now Playing Pi
| 43 Fundraising
│ ├── 43.01 St Jude 2023
| 44 Streaming
│ ├── 44.01 Backgrounds
50-59 Media
| 50 Tattoo Ideas
│ ├── 50.01 Inbox
│ ├── 50.02 Arm Tattoo
│ ├── 50.03 SleeveStar
│ ├── 50.04 CSS HTML Tattoo
| 51 Memes
│ ├── 51.01 Mine
│ ├── 51.02 Gifs
| 52 Profile
│ ├── 52.01 Avatars
│ ├── 52.02 Headers
│ ├── 52.03 Memoji
│ ├── 52.04 RK Logo
| 53 Wallpapers
│ ├── 53.01 Desktop
│ ├── 53.02 Phone
│ ├── 53.03 iPad
| 54 Media Screenshots
│ ├── 54.01 Comics
│ ├── 54.02 TV
│ ├── 54.03 Back to the Future Posters
│ ├── 54.04 Cornetto Trilogy Posters
| 55 Music
│ ├── 55.01 Album Covers
│ ├── 55.02 Linkin Park Demos
│ ├── 55.03 Bowling for Soup Demos
│ ├── 55.04 Albums
| 56 Photos and Videos
│ ├── 56.00 Camera Uploads
│ ├── 56.01 By Year
│ ├── 56.02 [redacted]
│ ├── 56.03 Paper Drawings
│ ├── 56.04 Various
│ ├── 56.06 Personal Videos
│ ├── 56.07 YouTube Videos
│ ├── 56.08 Wedding Photo Booth
	</pre>
</details>

### Using JD Elsewhere

One of the things I found really useful was the idea that by using numbers for sorting folders instead of names, _things don't move_. If I renamed `30.02 Garden Patio` to `30.02 Garden Decking` the folder _stays in the same place_. This seems obvious in hindsight but I found this so useful I incorporated it into my main Obsidian vault. Previously I had three folders called `Ideas`, `Posts`, and `Projects` as well as some more time-specific ones. Now, these are `00.01 Ideas`, `00.02 Posts`, and `00.03 Projects`. Another very obvious-in-hindsight idea came from Johnny's index video: sorting files by last modified instead of by name. I've found this to be way easier to be able to jump in and update a note quickly when I have an idea.

### Conclusion

I think systems like this tend to either work for a person or don't work at all, there's no middle ground. That's not the case for the JD system. I believe even if it doesn't work as a whole for someone (like John) there are loads of good ideas in here that can be applied in a lot of different cases. It _has_ worked very well for me and I've been able to find files I'm looking for so much quicker than I could before.

Check out the [Johnny Decimal website](https://johnnydecimal.com) to read more and if you like it, [check out the workbook](https://johnnydecimal.com/10-19-concepts/14-build-your-system/14.02-the-decimal-workbook/).