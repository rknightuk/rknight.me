---
title: "Advent of Code 2023: Day Two"
permalink: /blog/advent-of-code-2023-day-two/index.html
date: 2023-12-02T22:06:56.581Z
excerpt: "My solution for \"Cube Conundrum\""
layout: post
tags:
    - Development
    - AdventOfCode
---

After finally finding time to do today's challenge, I was able to knock it out in about 30 minutes for parts one and two. At the core of both of parts was parsing strings like this:

```php
$input = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    // and so on
];
```

### Part One

For part one I needed to get the game ID plus the amount and related colors from each pick of the games. There are a lot of ways of doing this but the solution I went with was some good-old fashioned string-replacement and exploding:

```php
$colors = [
    'red' => 12,
    'green' => 13,
    'blue' => 14,
];

$validGameTotal = 0;

foreach ($input as $line) {
    [$game, $games] = explode(':', $line);
    $gameId = explode(' ', $game)[1];
    $picks = explode(',', str_replace(';', ',', $games));
    $gameValid = true;

    foreach ($picks as $pick)
    {
        if (!$gameValid) continue;
        $pick = trim($pick);
        $color = explode(' ', $pick)[1];
        $amount = explode(' ', $pick)[0];
        if ($amount > $colors[$color]) {
            $gameValid = false;
            continue;
        }
    }

    if ($gameValid) {
        $validGameTotal += $gameId;
    }
}

echo $validGameTotal . PHP_EOL;
```

A `break` statement would make more sense instead of using `continue` but I'm not changing it now.

### Part Two

Part two was similar but I needed to find the highest value of each given color and multiply them. PHP's `max` function made this easy:

```php
foreach ($input as $line) {
    [$game, $games] = explode(':', $line);
    $gameId = explode(' ', $game)[1];
    $picks = explode(',', str_replace(';', ',', $games));

    $blue = 0;
    $red = 0;
    $green = 0;
    
    foreach ($picks as $pick) {
        $pick = trim($pick);
        $color = explode(' ', $pick)[1];
        $amount = explode(' ', $pick)[0];
        switch ($color) {
            case 'blue':
                $blue = max($blue, $amount);
                break;
            case 'red':
                $red = max($red, $amount);
                break;
            case 'green':
                $green = max($green, $amount);
                break;
        }
    }

    $total += ($blue * $red * $green);
}
```

Onwards to day three.

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/02).