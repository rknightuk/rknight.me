---
title: "Advent of Code 2023: Day Nine"
permalink: /advent-of-code-2023-day-nine/index.html
date: 2023-12-09T13:10:04.340Z
excerpt: "My solution for \"Mirage Maintenance\""
layout: post
tags:
    - Development
    - AdventOfCode
---

### Part One

Given this an input like this, find the next number in the sequence. See the [advent of code instructions](https://adventofcode.com/2023/day/9) for more details, but we need to go from this:

```text
0 3 6 9 12 15
```

To the following, to get the final value for that row of `18`. To do this we take the first two numbers and get the difference between them. That becomes our first number on the second row. Continue this until the final row is all zeros. Then take the last digit all of the rows and sum them to get `18` (0 + 3 + 15).

```text
0   3   6   9  12  15 -> 18
  3   3   3   3   3 -> 3
    0   0   0   0 -> 0
```

I interated over each line, used a while loop to check if the sum of the new row is more than zero, and continue adding rows until the new row's sum is zero (this assumption becomes important in a minute). Then grab all the final numbers and sum them for our row value, then sum all the lines to get the answer.

```php
foreach ($lines as $line) {
    $allNumbers = [];
    $allNumbers[] = explode(' ', $line);
    $currentIndex = 0;
    $finalNumbers = $allNumbers[array_key_last($allNumbers)];
    while (array_sum($finalNumbers) > 0) {
        $currentRow = $allNumbers[$currentIndex];
        $new = [];
        foreach ($currentRow as $index => $number) {
            if (!isset($currentRow[$index+1])) {
                $allNumbers[] = $new;
                $finalNumbers = $allNumbers[array_key_last($allNumbers)];
                continue;
            }
            $new[] = $currentRow[$index+1] - $number;
        }
        $currentIndex++;
    }

    $finalValue = 0;

    foreach ($allNumbers as $numbers) {
        $finalValue += $numbers[array_key_last($numbers)];
    }

    $total += $finalValue;
}

echo "Total: $total" . PHP_EOL;
```

This worked perfectly on the sample input but like other days the real input had a gotcha. As I noted above, I made the assumption that if the sum of a row was more than zero we should carry on but this doesn't account for negative numbers. What I _should_ have done was check if the sum was not _exactly zero_:

```diff
+ while (array_sum($finalNumbers) !== 0) {
- while (array_sum($finalNumbers) > 0) {
```

That was part one done.

### Part Two

Instead of calculating the _next_ number we need to do the _previous_ number from each sequence. All of my previous code for getting all the rows is the same, I just need to update my total calculator to generate the previous number for each row and get the previous number for the original sequence:


```diff
- $finalValue = 0;

- foreach ($allNumbers as $numbers) {
-    $finalValue += $numbers[array_key_last($numbers)];
- }

- $total += $finalValue;
```

```php
$next = 0;
foreach (array_reverse($allNumbers) as $index => $numbers) {
    if ($index === 0) { // skip the first row it's always zeros
        continue;
    }

    $first = $numbers[0];
    $next = $first - $next;
}

$total += $next;
```

This was a nice one. Nothing too hard to understand from the instructions and totally doable without knowing a magic maths solution.

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/{{TODO}}).
