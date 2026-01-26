# Bubble Sort (JavaScript)

## Overview

This repository contains a simple and optimized implementation of the **Bubble Sort** algorithm written in JavaScript. Bubble Sort is one of the most basic sorting algorithms and is commonly used for educational purposes to understand how sorting works at a fundamental level.

The algorithm repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. This implementation includes an optimization that stops the algorithm early if no swaps occur during a full pass, meaning the array is already sorted.

## Algorithm Explanation

Bubble Sort works by moving the largest unsorted element to its correct position at the end of the array during each iteration. With every outer loop pass, the range of comparison becomes smaller, since the last elements are already sorted.

An additional boolean flag is used in this implementation to detect whether any swaps were made during an iteration. If no swaps occur, the algorithm terminates early, improving performance in best-case scenarios.

## Code Implementation

```javascript
function bubble_sort(arr) {
    let cmp = true;
    let n = arr.length;

    for (let i = 0; i < n - 1; ++i) {
        cmp = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                cmp = true;
            }
        }
        if (!cmp) {
            break;
        }
    }
}

let arr = [5, 4, 3, 2, 1];
bubble_sort(arr);
console.log(arr);
```

## Usage

1. Copy the `bubble_sort` function into your JavaScript file.
2. Pass an array of numbers to the function.
3. The array will be sorted **in-place** in ascending order.

Example output:

```
[1, 2, 3, 4, 5]
```

## Complexity Analysis

* **Time Complexity**:

  * Worst case: O(n²)
  * Average case: O(n²)
  * Best case: O(n) (when the array is already sorted)

* **Space Complexity**:

  * O(1) — sorting is done in-place without extra memory

## Notes

* This implementation is best suited for learning and demonstration purposes.
* For large datasets, more efficient algorithms like Quick Sort, Merge Sort, or Tim Sort are recommended.

## License

This project is free to use for educational purposes.
