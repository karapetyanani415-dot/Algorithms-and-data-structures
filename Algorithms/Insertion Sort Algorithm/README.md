# Insertion Sort (JavaScript)

## Overview

This repository contains an implementation of the **Insertion Sort** algorithm in JavaScript. Insertion Sort is a simple and intuitive sorting algorithm, often used for small datasets or nearly sorted arrays. It builds the final sorted array one element at a time by comparing each new element with the already sorted part and inserting it in its correct position.

Insertion Sort is **stable**, meaning elements with equal values maintain their relative order, and it sorts in-place without requiring additional memory.

## Algorithm Explanation

The algorithm starts from the second element in the array and considers it the "key". It compares the key with elements before it and shifts all elements greater than the key to the right. Once the correct position is found, the key is inserted. This process repeats for every element until the array is sorted.

## Code Implementation

```javascript
function insertion_sort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

let arr = [12, 11, 13, 5, 6];
insertion_sort(arr);
console.log(arr); // [5, 6, 11, 12, 13]
```

## Usage

1. Call the `insertion_sort` function with an array of numbers.
2. The array will be sorted **in-place** in ascending order.

## Complexity Analysis

* **Time Complexity**:

  * Worst case: O(n²)
  * Average case: O(n²)
  * Best case: O(n) (when the array is already sorted)

* **Space Complexity**: O(1) — in-place sorting

## Notes

* Best suited for small or nearly sorted arrays.
* Stable and in-place.
* Often used as a subroutine in more advanced algorithms like Tim Sort.

## License

This project is free to use for educational purposes.
