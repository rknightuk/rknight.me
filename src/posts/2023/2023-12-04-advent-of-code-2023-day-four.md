---
title: "Advent of Code 2023: Day Four"
permalink: /advent-of-code-2023-day-four/index.html
date: 2023-12-04T13:07:52.766Z
excerpt: "My solution for \"Scratchcards\""
layout: post
tags:
    - Development
    - AdventOfCode
---

As soon as I saw this one this morning I knew it was going to at least be a bit easier than [yesterday](/advent-of-code-2023-day-three).

### Part One

The premise for today was scratchcards with two sets of numbers: winning numbers and numbers you have. The first half is winning numbers, the second is numbers you have.

```php
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
```

From the Advent of Code page:

> Card 1 has five winning numbers (41, 48, 83, 86, and 17) and eight numbers you have (83, 86, 6, 31, 17, 9, 48, and 53). Of the numbers you have, four of them (48, 83, 17, and 86) are winning numbers! 

Seemed easy enough especially when using PHP's [`array_intersect`](https://www.php.net/manual/en/function.array-intersect.php) which returns "_an array containing all the values of array that are present in all the arguments_". In this case, our winning numbers. For each winning number, the score doubles (starting with one for the first winning number). The goal was the find the total score of all the winning cards.

```php
$total = 0;

$lines = explode("\n", $input);

foreach ($lines as $line)
{
    // explode the string to get only the numbers
    [$card, $data] = explode(': ', $line);
    // get the two strings of numbers
    [$winners, $have] = explode('|', $data);

    // make them an array
    $winners = explode(' ', trim($winners));
    $have = explode(' ', trim($have));

    $winningNumbers = array_intersect($have, $winners);

    $currentTotal = 0;
    foreach ($winningNumbers as $win)
    {
        if ($currentTotal === 0) {
            // first number, so start at 1 for the score
            $currentTotal = 1;
            continue;
        }

        // each additional winning number doubles the score
        $currentTotal = $currentTotal * 2;

    }

    $total += $currentTotal;
}

echo 'Current total ' . $total . PHP_EOL;
```

I was pretty confident in this solution but I did not get the correct answer using the sample input. I then noticed the inconsistent spaces in the string so my `array_intersect` was returning additional empty values. A quick `array_filter` later and I had the correct answer so I was onto part two.

```diff
- $winningNumbers = array_intersect($have, $winners);
+ $winningNumbers = array_filter(array_intersect($have, $winners));
```

### Part Two

Part two is, as always, more complicated:

> Instead, scratchcards only cause you to win more scratchcards equal to the number of winning numbers you have
>
> Card 1 has four matching numbers, so you win one copy each of the next four cards: cards 2, 3, 4, and 5

Starting with part one's code, I did some processing of the data prior to looping over each scratchcard.

```php
$lines = explode("\n", $input);
$lines = array_map(function($l) {
    [$_, $data] = explode(': ', $l);
    [$winners, $have] = explode('|', $data);
    $winners = explode(' ', trim($winners));
    $have = explode(' ', trim($have));
    return [
        'winners' => $winners,
        'have' => $have,
    ];
}, $lines);
// [['winners' => [4,5,6], 'have' => [1,2,3]], ...]

$multipliers = array_fill(1, count($lines), 1);
// [1 => 1, 2 => 2, 3 => 3, ...]
```

I then looped over the scratchcards, identified the winning numbers, then for each number add to the `multipliers` for that card. For example, card one has four wininng numbers so it "copies" cards two, three, four, and five by setting it to `2`. When I hit card two in the loop, the added number would be `2` rather than one, because I have two copies of that card.

```php
foreach ($lines as $index => $line) {
    $cardId = $index + 1;
    
    // count the winning numbers
    $winCount = count(array_filter(array_intersect($line['have'], $line['winners'])));
    
    // if there are none, we don't need to make any card copies
    if ($winCount === 0) {
        continue;
    }

    // the card ID of the next card we need to copy
    $windex = $cardId + 1;

    // for each winning number, add the the multipliers to "copy" that card
    foreach (range(0, $winCount - 1) as $win) {
        $multipliers[$windex] += $multipliers[$cardId];
        $windex++;
    }
}
```

All in all this took me about 30 minutes for part one, and about 15 minutes for part two - although I did think about part two for a few hours while I was working.

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/04).
