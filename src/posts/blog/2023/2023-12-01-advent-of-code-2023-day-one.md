---
title: "Advent of Code 2023: Day One"
permalink: /blog/advent-of-code-2023-day-one/index.html
date: 2023-12-01T11:30:30.578Z
excerpt: "My solution for \"Trebuchet?!\""
layout: post
tags:
    - Development
    - AdventOfCode
---

Until [Zoe](https://zoeaubert.me) mentioned it this morning, I didn't know what [Advent of Code](https://adventofcode.com) was [^1]. Advent of Code is an "_advent calendar of small programming puzzles_". So once I knew what it was, I figured I'd give it a go. I'm not sure if I'll make it all month but I'll certainly try. I'm doing it in PHP because it's what I know and it will annoy Zoe a little bit; you can see [her rust-based solution here](https://zoeaubert.me/blog/advent-of-code-2023-day-01/).

### Part One

The first challenge was to extract the first and last digit from an array of strings, concatenate them, then get the total. For example the result of this on `1fghy2` would give `12`.

Anyone who knows me professionally knows regex is my kryptonite. It just doesn't click with my brain and I seem to forget anything I learn about it instantly. I fired up [regex101](https://regex101.com/) to give this a go anyway. Regex101 has a handy quick reference which told me I needed `\d` to find any digit. I used `preg_match_all` to get all digits:

```php
$input = [
    '1abc2',
    'pqr3stu8vwx',
    'a1b2c3d4e5f',
    'treb7uchet',
];

$result = array_reduce($input, function ($total, $line) {
    // get all digits
    preg_match_all('/\d/', $line, $matches);

    $first = $matches[0][0];
    $last = end($matches[0]);

    $total += $first . $last;
    return $total;
}, 0);

echo 'The total is ' . $result . PHP_EOL;
// The total is 142
```

### Part One

Part two added a complexity that some of the numbers could be written out as words instead of digits. Some of the strings might have no digits and some might have no numbers-as-words. So `onedsjfbi2` would give `12` and `23sdshseven` would give `27`. This part I _did_ know; find all digits, or the words of 1-9. A quick swap of my regex from before and mapping words to numbers with PHPs [null coalescing operator](https://www.php.net/manual/en/migration70.new-features.php):

```php
$lettersToNumbers = [
    'one' => 1,
    'two' => 2,
    // and so on
];

preg_match_all('/\d|one|two|three|four|five|six|seven|eight|nine)/', $line, $matches);

$first = $lettersToNumbers[$matches[0][0]] ?? $matches[0][0];
$last = $lettersToNumbers[end($matches[0])] ?? end($matches[0]);
```

I thought I'd cracked it but the advent of code site told me my number was too high. I logged out all the strings and the numbers I had found with my regex and eyeballed _a lot_ of them and everything seemed fine. After a good 20 minutes or so I had to call it quits and check out what [Lewis had for his solution](https://lewisdale.dev/post/advent-of-code-2023-day-one/). It turns out some of the strings have words that crossover, for example `35oneight`. The result _should_ be `38` but I was getting `31` because regex will match the first instance (in this case `one`) and then move on. I didn't look at Lewis' solution because I still want to attempt it myself.

After a bit of googling what I needed was a [capturing technique inside an unanchored positive lookahead](https://stackoverflow.com/questions/35458195/pcre-regular-expression-overlapping-matches)[^2] which would then return `eight` in the example above:

```php
preg_match_all('/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/', $line, $matches);
```

And there we go, day one done. 

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/01).

[^1]: Or more likely, I did know and just forgot about it.
[^2]: Very normal sentence, yes. Nothing to see here.