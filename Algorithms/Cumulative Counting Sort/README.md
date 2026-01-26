# Cumulative Counting Sort (JavaScript)

## Overview

This repository contains an implementation of **Cumulative Counting Sort** (also known as *Stable Counting Sort*) written in JavaScript. This version of Counting Sort uses cumulative (prefix) sums to determine the exact final position of each element in the sorted array.

Unlike the basic Counting Sort, this approach is **stable**, meaning that elements with the same value preserve their original relative order from the input array. Stability is especially important when sorting records by keys.

## Algorithm Explanation

The algorithm begins by finding the minimum and maximum values in the array, allowing it to handle negative numbers correctly.

A counting array is created to store how many times each value appears. After counting frequencies, the array is transformed into a cumulative count array, where each index stores the number of elements less than or equal to that value.

Using this cumulative information, the algorithm places each element directly into its correct position in the output array. Iteration is done from right to left to maintain stability.

## Code Implementation

```javascript
function cumulative_counting_sort(arr) {
  if (arr.length === 0) {
    return [];
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const count = new Array(max - min + 1).fill(0);

  for (const num of arr) {
    count[num - min]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  const output = new Array(arr.length);

  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const idx = num - min;
    const pos = count[idx] - 1;

    output[pos] = num;
    count[idx]--;
  }

  return output;
}
```

## Usage

1. Call the `cumulative_counting_sort` function with an array of integers.
2. The function returns a **new sorted array** in ascending order.
3. The original array remains unchanged.

Example:

```
Input:  [4, 2, 2, 8, 3, 3, 1]
Output: [1, 2, 2, 3, 3, 4, 8]
```

## Complexity Analysis

* **Time Complexity**: O(n + k)

  * `n` — number of elements
  * `k` — range of values (`max - min + 1`)

* **Space Complexity**: O(n + k)

  * Extra space is used for the counting array and output array

## Notes

* Works only with integers.
* Stable sorting algorithm.
* Efficient when the range of values is not very large.
* Commonly used as a subroutine in Radix Sort.

## License

This project is free to use for educational purposes.
