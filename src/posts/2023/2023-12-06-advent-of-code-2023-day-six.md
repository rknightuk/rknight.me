---
title: "Advent of Code 2023: Day Six"
permalink: /advent-of-code-2023-day-six/index.html
date: 2023-12-06T11:07:22.654Z
excerpt: "My solution for \"Wait For It\""
layout: post
tags:
    - Development
    - AdventOfCode
---

It's boat racing time. For each millisecond you hold the boat down, it's speed will increase by one millimeter per second. Just like the bus in Speed, the boat never slows down.

### Part One

The input format:

```bash
Time:      7  15   30
Distance:  9  40  200
```

Each column is a race which contains the race time and a distance the boat needs to travel to win. So in race one, the boat can travel the required distance (9) by holding down the boat for two, three, four, and five milliseconds. Here is some mathematics:

```php
$time = 7;
$distance = 9;
$testSeconds = 2;
$newDistance = $testSeconds * ($time - $current);
$canWin = $newDistance > $distance;

// $canWin = true
```

For each of the races I generated a range of numbers to test based on the time, then checked if those could win based on the distance for that race.

```php
$extract = function($input) {
    return array_values(array_filter(explode(' ', explode(':', $input)[1])));
};

[$times, $distances] = explode("\n", $input);
$times = $extract($times);
$distances = $extract($distances);

$wins = [];
foreach ($times as $race => $time) {
    $distance = $distances[$race];
    $range = range(1, $time);
    $winCount = 0;
    foreach ($range as $r)
    {
        $newDistance = $r * ($time - $r);
        $canWin = $newDistance > $distance;
        if ($canWin)
        {
            $winCount++;
        }
    }
    $wins[] = $winCount;
}

echo 'Total is ' . array_product($wins) . PHP_EOL;
```

Got the correct total, part one done. Easy peasy.

### Part Two

Apprently the kerning on the peice of paper the input was written on was not good and it's actually just one race and not multiple.[^1] So now we have one large race:

```
$time = 71530;
$distance = 940200;
```

I switched out my extractor to remove all the spaces and give me just two numbers (I put them in an array so I could avoid changing any of the other code):

```php
$extract = function ($input) {
    return (int) str_replace(' ', '', explode(':', $input)[1]);
};

[$times, $distances] = explode("\n", $input);
$times = [$extract($times)];
$distances = [$extract($distances)];
```

Like [yesterday](https://rknight.me/advent-of-code-2023-day-five/) when I also used `range` on some large numbers, I ran out of memory. I did throw memory at it and it worked but I knew an easy fix for this one so I changed the `range` logic to a `while` loop.

```php
foreach ($times as $race => $time) {
    $distance = $distances[$race];
    $winCount = 0;
    $current = 1;
    while ($current < $time) {
        $newDistance = $current * ($time - $current);
        $canWin = $newDistance > $distance;
        if ($canWin) {
            $winCount++;
        }
        $current++;
    }
    $wins[] = $winCount;
}

echo 'Total is ' . array_product($wins) . PHP_EOL;
```

And that was part two. I don't know how efficient `array_product` is and I could have just calculated the total as I went along instead of adding to an array instead.

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/{{TODO}}).

[^1]: The "story" part of advent of code is really something.
