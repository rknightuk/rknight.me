---
title: "Advent of Code 2023: Day Three"
permalink: /advent-of-code-2023-day-three/index.html
date: 2023-12-03T11:50:39.013Z
excerpt: "My solution for \"Gear Ratios\""
layout: post
tags:
    - Development
    - AdventOfCode
---

More regex and string parsing today. Sounds like a party.[^1]

### Part One

Given an "engine schematic" like below, identify which numbers are part numbers. That is, they have a symbol (not a `.` though) either next to, above, or below them including diagonally.

```txt
467..114..
...*......
..35..633.
```

In this example, `467` and `35` _are_ part numbers, `114` and `633` are not.

My plan was a such: go through each line, identifying the part numbers and symbols, and then use `strpos` to work out if they are or are not part numbers. I also generated a range that I could use with `substr` to get the location of the number (plus an additional character each side) on the previous, current, and next lines. For example if my string was as below, the range starts at  `2` and ends at `5`.

```php
//       0123456789
$line = '...56.....';

// then use substr to get `.56.`
substr($line, 2, 5 - 2);
```

After some tinkering around I had a solution that worked. At least for the sample input.

```php
$explodedInput = explode("\n", $input);
$strippedInput = str_replace('.', ' ', $input);

$total = 0;

foreach (explode("\n", $strippedInput) as $index => $line)
{
    preg_match_all('/\d+/', $line, $numbers);
    preg_match_all('/\D/', str_replace(' ', '', $line), $symbols);

    $current = $explodedInput[$index] ?? '';
    $previous = $explodedInput[$index - 1] ?? '';
    $next = $explodedInput[$index + 1] ?? '';

    foreach ($numbers[0] as $number) {
        $position = strpos($line, $number);
        $range = [
            $position === 0 ? $position : $position - 1,
            $position + strlen($number) + 1 - ($position === 0 ? $position : $position - 1),
        ];

        $findInCurrent = substr($current, $range[0], $range[1]);
        $findInPrevious = substr($previous, $range[0], $range[1]);
        $findInNext = substr($next, $range[0], $range[1]);
        preg_match_all('/[^0-9\.]/', $findInCurrent, $sc);
        preg_match_all('/[^0-9\.]/', $findInPrevious, $sp);
        preg_match_all('/[^0-9\.]/', $findInNext, $sn);

        if (
            count($sc[0]) > 0 || count($sp[0]) > 0 || count($sn[0]) > 0
        ) {
            $total += $number;
        }
    }
}

echo 'Current total ' . $total . PHP_EOL;
```

When I ran this on the real data, my total was too high. Despite how it looks, the code is relatively straight forward so I knew there must be something tiny I was missing.

What I haven’t accounted for was numbers appearing more than once in a single line. I was using `strpos` which finds the first instance of a string so if the string was `654...6...` then when I tried to find that second `6` it would find the first one. It sounds obvious but on the first pass it just didn't occur to me.

Off the top of my head I didn't know how to fix this problem. Turns out `preg_match_replace` [can take a fourth parameter](https://www.php.net/manual/en/function.preg-match-all.php) of `PREG_OFFSET_CAPTURE` to return the string offset of the found string:

```php
$line = '654...6...';

preg_match_all('/\d+/', $line, $numbers);
// [["654","6"]]

preg_match_all('/\d+/', $line, $numbersWithOffset, PREG_OFFSET_CAPTURE);
// [[["654",0], ["6",6]]]
```

Then instead of getting the position separately, I could grab it from the matches:

```diff
- foreach ($numbers[0] as $number)
+ foreach ($numbers[0] as $numberData)
{
- $position = strpos($line, $number);
+ [$number, $position] = $numberData;
```

And just like that I had the correct answer to part one.

### Part Two

Today's puzzle did not spark joy so I just didn't do part two. [Zoe](https://zoeaubert.me/blog/advent-of-code-2023-day-03/) and [Lewis](https://lewisdale.dev/post/advent-of-code-2023-day-three/) did if you want to see a completed solution. Here's hoping tomorrow is a bit less straining on my sleep-deprived brain.

My solution for part one is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/03).


[^1]: It wasn't a party at all.