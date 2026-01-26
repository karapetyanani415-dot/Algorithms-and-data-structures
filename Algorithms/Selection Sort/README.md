# Selection Sort (JavaScript)

## Overview

This repository contains an implementation of the **Selection Sort** algorithm in JavaScript. Selection Sort is a simple comparison-based sorting algorithm that repeatedly finds the minimum (or maximum) element from the unsorted portion of the array and places it at the beginning.

Selection Sort is **not stable**, meaning that equal elements may not retain their relative order after sorting. It sorts the array in-place, so it does not require extra memory.

## Algorithm Explanation

The algorithm divides the array into a sorted and an unsorted part. Initially, the sorted part is empty. In each iteration, the smallest element from the unsorted part is selected and swapped with the first element of the unsorted part. This process continues until the array is fully sorted.

## Code Implementation

```javascript
function selection_sort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; ++i) {
        let idx = i;
        for (let j = 0; j < n; ++j) {
            if (arr[idx] > arr[j]) {
                idx = j;
            }
        }
        [arr[idx], arr[i]] = [arr[i], arr[idx]];
    }
}

let arr = [64, 25, 12, 22, 11];
selection_sort(arr);
console.log(arr); // [11, 12, 22, 25, 64]
```

## Usage

1. Call the `selection_sort` function with an array of numbers.
2. The array will be sorted **in-place** in ascending order.

## Complexity Analysis

* **Time Complexity**:

  * Worst case: O(n²)
  * Average case: O(n²)
  * Best case: O(n²) (even if the array is already sorted)

* **Space Complexity**: O(1) — in-place sorting

## Notes

* Best suited for small arrays due to O(n²) complexity.
* Not stable.
* Performs fewer swaps than Insertion Sort but more comparisons.

## License

This project is free to use for educational purposes.
