# Binary Search Implementation (C)

This repository contains two different approaches to the **Binary Search** algorithm implemented in C: Recursive and Iterative.

[Image of binary search algorithm diagram]

## Table of Contents

- [Overview](#overview)
- [Implementations](#implementations)
- [How It Works](#how-it-works)
- [The Midpoint Overflow Fix](#the-midpoint-overflow-fix)
- [Complexity Analysis](#complexity-analysis)

---

## Overview

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

**Note:** This algorithm only works on **sorted** arrays.

---

## Implementations

### 1. Recursive Approach (`search` function)

The recursive method calls itself with updated boundaries (`start` and `end`) until the target is found or the boundaries overlap.

- **Pros:** Cleaner, more mathematical logic.
- **Cons:** Uses more stack memory.

### 2. Iterative Approach (`binary_search` function)

The iterative method uses a `while` loop to narrow down the range.

- **Pros:** More memory-efficient (O(1) space).
- **Cons:** Slightly more "boilerplate" code.

---

## How It Works

1. Compare the `target` value to the middle element (`mid`) of the array.
2. If `target == arr[mid]`, the search is successful; return the index.
3. If `target < arr[mid]`, repeat the search in the left half.
4. If `target > arr[mid]`, repeat the search in the right half.
5. If the range is empty, the target is not in the array; return `-1`.

---

## The Midpoint Overflow Fix

In both implementations, the middle index is calculated as:
$$mid = start + (end - start) / 2$$

**Why not use `(start + end) / 2`?**
In programming, if `start` and `end` are very large integers, their sum `(start + end)` might exceed the maximum capacity of a 32-bit signed integer ($2^{31} - 1$). This results in **Integer Overflow**, causing the value to wrap around to a negative number and crashing the logic.

By using `start + (end - start) / 2`, we ensure the intermediate calculation never exceeds the value of `end`, making the code robust for massive datasets.

---

## Complexity Analysis

| Metric                              | Complexity  |
| :---------------------------------- | :---------- |
| **Time Complexity (Best)**          | $O(1)$      |
| **Time Complexity (Average/Worst)** | $O(\log n)$ |
| **Space Complexity (Iterative)**    | $O(1)$      |
| **Space Complexity (Recursive)**    | $O(\log n)$ |

---
