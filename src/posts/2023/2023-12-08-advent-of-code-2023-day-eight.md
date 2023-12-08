---
title: "Advent of Code 2023: Day Eight"
permalink: /advent-of-code-2023-day-eight/index.html
date: 2023-12-08T08:19:58.879Z
excerpt: "My solution for \"Haunted Wasteland\""
layout: post
tags:
    - Development
    - AdventOfCode
---

We've navigating a network today for...reasons.

### Part One

The sample input looks like so:

```text
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
```

The first line is a list of instructions (left or right) and the rest is the nodes with their left and right defined. So if we go right from `AAA`, we move to `CCC`, then left from there takes us to `ZZZ`. The puzzle is to count how many steps it takes to get to `ZZZ`.

I did a bunch of string replacement and exploding to get the output in a format I wanted:

```php
$input = array_filter(explode("\n", $input));

$instructions = str_split($input[0]);
unset($input[0]);

$elements = [];
foreach ($input as $value) {
    $data = explode(' = ', $value);
    $elementKey = $data[0];
    [$L, $R] = explode(', ', str_replace(')', '', str_replace('(', '', $data[1])));
    $elements[$elementKey] = compact('L', 'R');
}

// [
//    'AAA' => [ 'L' => 'BBB', 'R' => 'CCC' ],
//    'BBB' => [ 'L' => 'DDD', 'R' => 'EEE' ],
//    ...
// ]
```

One other part of this is that you may not get to `ZZZ` with the set of instructions. So if you hit the end, go back to the start of the instructions. I set the starting values and counters then while `found` is false, I incremenent the instruction index until we hit `ZZZ`:

```php
$element = array_key_first($elements);
$found = false;
$instructionIndex = 0;
$steps = 0;

while (!$found) {
    // if we're at the end of the instructions, go back to the start
    if ($instructionIndex === count($instructions)) {
        $instructionIndex = 0;
    }
    $instruction = $instructions[$instructionIndex];
    $element = $elements[$element][$instruction];
    if ($element === 'ZZZ')
    {
        $found = true;
    }

    $instructionIndex++;
    $steps++;
}

echo 'It takes ' . $steps . ' steps to reach ZZZ' . PHP_EOL;
```

I ran it on the real input and I got stuck in an infinite loop. Initially I didn't read the instructions properly so I was starting at whatever the first node was; in the samples, this is always `AAA` but in the real input, it _isn't_. I stepped back and re-read what I was supposed to be doing and fixed this:

```diff
- $element = array_key_first($elements);
+ $element = 'AAA';
```

Re-ran it and it worked perfectly.

### Part Two

For part two there some story about a ghost or whatever, but the crux of it is we need to follow multiple paths starting at all node that end with an `A`. We're only done when all the nodes for all paths end in a `Z`. I updated my formatting code to account for this:

```diff
+ $startingElements = [];
$elements = [];
foreach ($input as $value) {
    $data = explode(' = ', $value);
    $elementKey = $data[0];
    [$L, $R] = explode(', ', str_replace(')', '', str_replace('(', '', $data[1])));
    $elements[$elementKey] = compact('L', 'R');
+    if (str_ends_with($elementKey, 'A')){
+        $startingElements[] = $elementKey;
+    }
}
```

For the new sample input gave me two starting points (the real input has five):

```php
$test = 'LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)';

// ...

[
    0 => '11A',
    1 => '22A',
]
```

Next I updated my instruction loop to go through each starting point, get the next element for all of them, then check if they all the found elements end with a `Z`:

```php
while (!$found) {
    if ($instructionIndex === count($instructions)) {
        $instructionIndex = 0;
    }
    $foundElements = [];
    $instruction = $instructions[$instructionIndex];
    $check = true;
    foreach ($elementRange as $er) {
        $el = empty($nextElements) ? $startingElements[$er] : $nextElements[$er];
        $foundElements[] = $elements[$el][$instruction];
    }
    $allEndWithZ = count(array_filter($foundElements, function ($fe) {
        return str_ends_with($fe, 'Z');
    })) === $elementCount;
    if ($allEndWithZ) {
        $found = true;
    }
    $nextElements = $foundElements;

    $instructionIndex++;
    $steps++;
}
```

I ran it on the sample, no problem. Ran it on the real input and it just kept going. For a long time. I ran it for 45 minutes and it was still going. I spoke to [Zoe](https://zoeaubert.me), who had already finished part two, and the correct answer is 14 digits. Based on her maths, this method would take somewhere in the region of 500 hours. I knew there had to be some kind of number...things I could do to work out the answer but it was beyond me at this point.

### Part Two Redux

After [making a joke](https://social.lol/@robb/111545115167242100) about wanting a supercomputer on Mastodon, [Chris asked](https://fosstodon.org/@chrishannah/111545160939769663) if I wanted a clue he'd seen on the subreddit. I had no idea how to solve this so yes, yes I did. The clue:

> Lowest Common Multiple

_Of course_ the solution was a maths concept I'd heard of but never had a need to use (or I did and I just wasn't listening at school). "_The smallest positive integer that is divisible by both a and b_". As always, PHP has a function for this: [`git_lcm`](https://www.php.net/manual/en/function.gmp-lcm.php) but this only works for two numbers. I made a new file (`2v2.php`), extracted my path-to-Z logic into a function, collected the steps for each path, and calculated the lowest common multiple.

```php
$allSteps = [];

foreach ($startingElements as $element)
{
    $steps = stepsToZ($instructions, $elements, $element);
    $allSteps[] = gmp_init($steps); // numbers passed to `gmp_lcm` need to be converted to GMP
}

$result = $allSteps[0];

foreach ($allSteps as $index => $step)
{
    if ($index === 0) continue;
    $result = gmp_init((string) gmp_lcm($result, $step));
}

echo (string) $result . PHP_EOL;
```

I'm still not clear on _why_ this gets the answer beyond _maths_ but whatever, it's done. Onwards to day nine.

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/08).
