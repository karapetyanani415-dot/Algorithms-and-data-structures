# Binary Search Implementation (JavaScript)

This repository contains two common patterns for implementing the **Binary Search** algorithm in JavaScript: **Recursive** and **Iterative**.



## Table of Contents
* [Overview](#overview)
* [Implementations](#implementations)
* [How It Works](#how-it-works)
* [The Midpoint Calculation](#the-midpoint-calculation)
* [Complexity Analysis](#complexity-analysis)

---

## Overview
Binary Search is a highly efficient algorithm for finding an item within a **sorted** array. It follows the "Divide and Conquer" strategy, reducing the search area by half with every single comparison.

---

## Implementations

### 1. Recursive Approach (`search`)
This version uses a helper function that calls itself with updated `start` or `end` indices.
* **Mechanism:** Leverages the call stack to manage state.
* **Code Style:** Functional and declarative.

### 2. Iterative Approach (`binary_search`)
This version uses a `while` loop to adjust the search boundaries.
* **Mechanism:** Updates local variables within a single function execution.
* **Efficiency:** Generally preferred in JavaScript to avoid stack overflow errors on extremely large datasets.

---

## How It Works
1.  **Initialize:** Define the `start` (index 0) and `end` (last index) of the array.
2.  **Middle Point:** Find the middle index `mid`.
3.  **Compare:**
    * If `nums[mid] === target`, return `mid` (Found!).
    * If `nums[mid] > target`, the target must be in the left half; set `end = mid - 1`.
    * If `nums[mid] < target`, the target must be in the right half; set `start = mid + 1`.
4.  **Repeat:** Continue until `start > end`. If not found, return `-1`.

---

## The Midpoint Calculation

In JavaScript, division results in floating-point numbers. To get an integer index, we use:
`let mid = start + Math.floor((end - start) / 2);`

**Why use `start + (end - start) / 2`?**
While JavaScript handles large numbers better than languages like C, this pattern is a "Best Practice" in computer science. It prevents potential **Integer Overflow** in languages with fixed-size integers and ensures the calculation stays within the safe bounds of the array indices.

---

## Complexity Analysis

| Metric | Complexity |
| :--- | :--- |
| **Time Complexity (Best)** | $O(1)$ |
| **Time Complexity (Worst)** | $O(\log n)$ |
| **Space Complexity (Iterative)** | $O(1)$ |
| **Space Complexity (Recursive)** | $O(\log n)$ |

---
