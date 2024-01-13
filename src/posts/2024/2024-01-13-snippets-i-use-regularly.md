---
title: "Snippets I Use Regularly"
permalink: /blog/snippets-i-use-regularly/index.html
date: 2024-01-13T14:17:27.713Z
excerpt: "A list of my most-used snippets in Alfred"
layout: post
tags:
    - Development
    - Alfred
    - MacOS
---

<style>
    th { width: 30%; }
    table { text-align: center; font-size: 0.9em; }
</style>

Someone recently asked me how I was able to respond to a message so quickly to a keyboard shortcut question using the command and shift symbols (<kbd>⌘</kbd> <kbd>⇧</kbd>) in my response. Snippets is the answer and I thought it would be a good idea to post the ones I use regularly.

These all run through [Alfred](https://www.alfredapp.com) which is my favourite Mac app by a longshot but there are other options that do similar things like [TextExpander](https://textexpander.com/), [Espanso](https://espanso.org/), and [Typinator](https://ergonis.com/typinator). I always prefix my snippets with `;` so I don't accidentally trigger them during normal typing[^1].

#### General Snippets

These are mostly used when write code, or git commits. The date ones I probably used 20 times a day.

<div style="overflow-x: auto">
<table>
    <thead>
        <tr>
            <th>keyword</th>
            <th>output</th>
            <th>notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>;em</code></td>
            <td>email address</td>
            <td>I also have one of these for my work email</td>
        </tr>
        <tr>
            <td><code>;dn</code></td>
            <td>1955-11-05</td>
            <td>Alfred syntax: <code>{date:Y-MM-dd}</code></td>
        </tr>
        <tr>
            <td><code>;cl</code></td>
            <td>[1955-11-05]</td>
            <td>I used this a lot for adding entries to changelogs at work</td>
        </tr>
        <tr>
            <td><code>;dtn</code></td>
            <td>1955-11-05 06:16</td>
            <td>Alfred syntax: <code>{date:Y-MM-dd HH:mm}</code></td>
        </tr>
        <tr>
            <td><code>;sel</code></td>
            <td><code>select * from</code></td>
            <td></td>
        </tr>
        <tr>
            <td><code>;cl</code></td>
            <td><code>console.log()</code></td>
            <td></td>
        </tr>
        <tr>
            <td><code>;uuid</code></td>
            <td><code>A41861B4-3EF1-4161-B080-2F9CA025D78A</code></td>
            <td>Alfred syntax: <code>{random:UUID}</code></td>
        </tr>
    </tbody>
</table>
</div>

#### Symbols

These are ones that I really don't _need_ but it's nice to use the trademark or multiplication symbols when ~~shitposting on Mastodon~~ having very serious conversations with my friends. Quality Jokes™: a robb × mastodon collab.

<div style="overflow-x: auto">
<table>
    <thead>
        <tr>
            <th>keyword</th>
            <th>output</th>
            <th>notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>;shrug</code></td>
            <td><code>¯\_(ツ)_/¯</code></td>
            <td></td>
        </tr>
        <tr>
            <td><code>;bull</code></td>
            <td>•</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;deg</code></td>
            <td>°</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;x</code></td>
            <td>×</td>
            <td>This is the symbol that <em>should</em> be used for multiplication. And collabs of course.</td>
        </tr>
        <tr>
            <td><code>;tm</code></td>
            <td>™</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;ctrl</code></td>
            <td>⌃</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;shift</code></td>
            <td>⇧</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;opt</code></td>
            <td>⌥</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;cmd</code></td>
            <td>⌘</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;kall</code></td>
            <td>⌘⇧⌥⌃</td>
            <td></td>
        </tr>
        <tr>
            <td><code>;kopt</code></td>
            <td><code>&lt;kbd&gt;⌥&lt;/kbd&gt;</code></td>
            <td>*</td>
        </tr>
        <tr>
            <td><code>;kcmd</code></td>
            <td><code>&lt;kbd&gt;⌘&lt;/kbd&gt;</code></td>
            <td>*</td>
        </tr>
        <tr>
            <td><code>;kshift</code></td>
            <td><code>&lt;kbd&gt;⇧&lt;/kbd&gt;</code></td>
            <td>*</td>
        </tr>
        <tr>
            <td><code>;kctrl</code></td>
            <td><code>&lt;kbd&gt;⌃&lt;/kbd&gt;</code></td>
            <td>*</td>
        </tr>
    </tbody>
</table>
</div>

\* `kbd` is the rarely-seen [keyboard input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd). Example which I defintiely didn't just add to my css for this blog post: <kbd>⌘</kbd>


[^1]: It still happens on occasion