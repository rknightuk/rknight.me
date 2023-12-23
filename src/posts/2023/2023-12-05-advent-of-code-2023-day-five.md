---
title: "Advent of Code 2023: Day Five"
permalink: /blog/advent-of-code-2023-day-five/index.html
date: 2023-12-05T11:40:26.302Z
excerpt: "My solution for \"If You Give A Seed A Fertilizer\""
layout: post
tags:
    - Development
    - AdventOfCode
---

The description for this puzzle was confusing. Like, _really_ confusing. I had to read it at least five times before I even understood the question.

### Part One

For this puzzle the sample input was as follows:

```txt
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
```

Each line of a map is the destination start, the source start, and the range length. For example if we take the first line of the `seed-to-soil map`:

```php
$line = '50 98 2';

[$destinationStart, $sourceStart, $rangeLength] = explode(' ', $line);
$sourceRange = range(
    $sourceStart, 
    $sourceStart + $rangeLength - 1
);
$destinationRange = range(
    $destinationStart, 
    $destinationStart + $rangeLength - 1
);

$mapped = array_combine($sourceRange, $destinationRange);
$mapped = [
    98 => 50,
    99 => 51,
];
```

This needs to be done for every map in the input. Then take the seed number for the first map, get the value (or the previous value if it's not in the range), and so on to the last location value. So in the above example if the seed number is `98` the value is `50`. Then take `50` and see if that exists in the `soil-to-fertilizer map`. If this makes no sense, have a look at the [advent of code page for today's puzzle](https://adventofcode.com/2023/day/5).[^1]

Below is my full "solution". I'm looping through each line of each map, generating the ranges based on the numbers, and adding it to a `mapData` array. Notice I'm using `array_combine` to use the source values as the keys and the destination values as the new values. `array_replace` preserves keys unlike `array_merge` which resets keys, which in this case are important.

```php

$rawData = explode("\n\n", $input);
$seeds = explode(' ', str_replace('seeds: ', '', $rawData[0]));
unset($rawData[0]);

$mapData = [];

foreach ($rawData as $value) {
    $lines = explode("\n", $value);
    $mapName = str_replace(' map:', '', $lines[0]);
    unset($lines[0]);
    $mapData[$mapName] = [];
    foreach ([$lines] as $line)
    {
        [$destinationStart, $sourceStart, $rangeLength] = explode(' ', $line);

        // generate the ranges for the source and destination
        $mapData[$mapName] = array_replace($mapData[$mapName], array_combine(
            range($sourceStart, $sourceStart + $rangeLength - 1),
            range($destinationStart, $destinationStart + $rangeLength - 1),
        ));
    }
}

$locations = [];

foreach ($seeds as $seed)
{
    // keep track of the current value, starting with the seed
    $current = $seed;
    foreach ($mapData as $mapName => $map)
    {
        // if there isn't a value set, fallback to the current
        $current = $map[$current] ?? $current;
    }
    $locations[] = $current;
}

echo 'Lowest location number is ' . min($locations) . PHP_EOL;
```

This worked for the sample input which was nice given how long I spent trying to understand the puzzle to start with. Then I ran it on the real input and got this out of memory error:

```bash
Fatal error: Allowed memory size of 536870912 bytes exhausted
```

I hadn't actually looked at the real input at this point. The real input has _huge_ numbers compared to the sample input so the range generation was causing PHP to run out of memory. Which means I had to rethink my solution _or_ throw a bunch of memory at it and hope for the best.

![Button meme showing "Make my code better" on one side and "give it ALL the memory I can"](https://rknightuk.s3.amazonaws.com/site/advent-button-meme.png)

So I ran it with 64GB of memory: `php -d memory_limit=64000M 1.php` and it worked! Or at least, it ran. It gave me an answer that was wrong. I had a better look at the numbers in the real input and called it a day. 

Two hours later I had a moment of clarity and realised how to solve this without needing the [1.102 exaFLOPS of the Frontier supercomputer](https://en.wikipedia.org/wiki/Frontier_(supercomputer)). I also noticed a bit of testing code which sliced one of the arrays so even if I hadn't had the memory problems, I was never going to get the right answer. Whoops.

### Part One Redux

Instead of generating the ranges for every number, I could work out the index of the seed by generating the start and end of each of the ranges:

```diff
- $mapData[$mapName] = array_replace($mapData[$mapName], array_combine(
-    range($sourceStart, $sourceStart + $rangeLength - 1),
-    range($destinationStart, $destinationStart + $rangeLength - 1),
- ));
+ $mapData[$mapName][] = [
+    'sourceStart' => $sourceStart,
+    'sourceEnd' => $sourceStart + $rangeLength - 1,
+    'destinationStart' => $destinationStart,
+    'destinationEnd' => $destinationStart + $rangeLength - 1,
+ ];
```

Then calculate the difference to make my index, then use that index on the next "map" to get the correct value:

```php
$locations = [];

foreach ($seeds as $seed) {
    $current = $seed;
    foreach ($mapData as $mapName => $mapArray) {
        foreach ($mapArray as $map)
        {
            if ($current >= $map['sourceStart'] && $current <= $map['sourceEnd']) {
                $index = $current - (int) $map['sourceStart'];
                $current = (int) $map['destinationStart'] + $index;
                break;
            }
        }
    }
    $locations[] = $current;
}

echo 'Lowest location number is ' . min($locations) . PHP_EOL;
```

Part one done. And I didn't even need to give it extra memory to run.

### Part Two

To paraphrase Marie Kondo:

> your feelings are the standard for decision making – specifically, knowing what sparks joy.  To determine this when writing code, the key is to pick up each bit of code one at a time, and ask yourself quietly, “Does this spark joy?”

Just like 2015's Fantastic Four, there is no part two. Not today, satan.

My code is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/05).

[^1]: And probably be as confused as I was