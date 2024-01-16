// ==Bookmarklet==
// @name +Link
// @description New link for rknight.me
// @version 1.0
// ==/Bookmarklet==

// Adapted from https://gist.github.com/codeguy/6684588#gistcomment-3361909
const slugify = (str) => {
  let slug = str.toString();
  console.log(`1: ${slug}`);
  slug = slug.replaceAll('/', ' ');
  console.log(`2: ${slug}`);
  slug = slug.normalize('NFD');
  console.log(`3: ${slug}`);
  slug = slug.replace(/[\u0300-\u036f]/g, '');
  console.log(`4: ${slug}`);
  slug = slug.toLowerCase();
  console.log(`5: ${slug}`);
  slug = slug.replace(/\s+/g, ' ');
  console.log(`6: ${slug}`);
  slug = slug.replace(/[^\w ]+/g, ' ');
  console.log(`7: ${slug}`);
  slug = slug.trim();
  console.log(`8: ${slug}`);
  slug = slug.replace(/ +/g, '-');
  console.log(`9: ${slug}`);

  return slug;
};

/* **********************************************************************************
/* Get data from the page
/* *********************************************************************************/
let pageTitle = window.document.title;
let linkSelection =
  'getSelection' in window ? window.getSelection().toString().trim() : '';
let linkContent =
  linkSelection ||
  window.document
    .querySelector('head meta[name=description i]')
    ?.content.trim() ||
  window.document.querySelector('main p')?.textContent.trim() ||
  window.document.querySelector('article p')?.textContent.trim() ||
  window.document.querySelector('p')?.textContent.trim();
let linkUrl = window.location.href;

const web = window.location.origin
const link = window.location.href

let authorName = document.querySelector('.p-name')?.textContent
if (!authorName) authorName = document.querySelector('[rel="author"]')?.textContent

const mastodonAccounts = Array.from(document.querySelectorAll('[rel="me"]')).filter(e => {
        return e.href.includes('@') && !e.href.includes('twitter.com') && !e.href.includes('threads.net') && !e.href.includes('tiktok.com')
    }).map(e => e.href).join(', ')
const FEED_SELECTORS = [
  'link[type="application/rss+xml"]',
  'link[type="application/atom+xml"]',
  'link[type="application/json"]',
]

/* **********************************************************************************
/* Ask the user to confirm/modify the title
/* *********************************************************************************/
let title = window.prompt('Title of the link?', pageTitle);

const run = () => {
  let feedUrl = null
  FEED_SELECTORS.forEach((selector) => {
    if (feedUrl) return
    const feedLink = document.querySelector(selector)
    if (feedLink) {
      feedUrl = feedLink.href
    }
  })

if (title !== null) {
  let slug = window.prompt('Slug of the link?', slugify(title));

  if (slug !== null) {
    const postDate = new Date().toISOString()
    const year = new Date().getFullYear()

    let value = `---
title: "${title}"
permalink: /links/${slug}/index.html
link: ${link}
date: ${postDate}
author: 
  name: ${authorName ? authorName : ''}
  web: ${web}
  feed: ${feedUrl}
  mastodon: ${mastodonAccounts}
---
\n${linkContent ? `> ${linkContent.replaceAll('\n', '\n> ')}` : ''}
`;

    /* **********************************************************************************
    /* Build the URL
    /* *********************************************************************************/
    const pathDate = postDate.slice(0, 10);
    const filename = `src/links/${year}/${pathDate}-${slug}.md`;

    let newFileUrl = `https://github.com/rknightuk/rknight.me/new/master/?filename=${filename}&value=${encodeURIComponent(
      value
    )}&message=${encodeURIComponent(`New link: ${title}`)}`;

    window.open(newFileUrl);
  }
  }
}

run()
