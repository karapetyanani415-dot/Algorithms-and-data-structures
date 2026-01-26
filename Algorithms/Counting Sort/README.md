# Counting Sort (JavaScript)

## Overview

This repository contains an implementation of the **Counting Sort** algorithm written in JavaScript. Counting Sort is a non-comparison-based sorting algorithm that works efficiently when the range of input values is not significantly larger than the number of elements to be sorted.

Unlike algorithms such as Bubble Sort or Quick Sort, Counting Sort does not compare elements directly. Instead, it counts how many times each distinct value appears and then reconstructs the sorted array based on these counts.

## Algorithm Explanation

The algorithm first determines the minimum and maximum values in the input array. This allows it to correctly handle arrays that include negative numbers.

A counting array is then created, where each index represents a possible value in the range from `min` to `max`. The algorithm iterates over the input array and increments the corresponding index in the counting array for each number encountered.

Finally, the sorted output array is built by iterating through the counting array and inserting each value the number of times it was counted.

## Code Implementation

```javascript
function counting_sort(arr) {
  if (arr.length === 0) {
    return [];
  }

  const n = arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const count = new Array(max - min + 1).fill(0);

  for (const num of arr) {
    count[num - min]++;
  }

  const output = [];
  for (let i = 0; i < max - min + 1; i++) {
    while (count[i] > 0) {
      output.push(i + min);
      count[i]--;
    }
  }

  return output;
}
```

## Usage

1. Call the `counting_sort` function with an array of integers.
2. The function returns a **new sorted array** in ascending order.

Example:

```
Input:  [4, 2, 2, 8, 3, 3, 1]
Output: [1, 2, 2, 3, 3, 4, 8]
```

## Complexity Analysis

* **Time Complexity**: O(n + k)

  * `n` is the number of elements in the array
  * `k` is the range of input values (`max - min + 1`)

* **Space Complexity**: O(n + k)

  * Additional space is used for the counting array and output array

## Notes

* Counting Sort works only with integers.
* It is very fast when the value range is small.
* Not suitable when the range of numbers is very large compared to the array size.

## License

This project is free to use for educational purposes.
