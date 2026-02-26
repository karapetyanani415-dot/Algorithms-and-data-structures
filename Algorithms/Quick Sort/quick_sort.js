function partition(arr, low = 0, high = arr.length) {
  const pivot = arr[low];
  let i = low + 1;
  let j = high;
  while (i <= j) {
    while (arr[i] <= pivot) ++i;
    while (arr[j] > pivot) --j;
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      ++i;
      --j;
    }
  }
  [arr[low], arr[j]] = [arr[j], arr[low]];
  return i;
}

function quick_Sort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quick_Sort(arr, low, pi - 1);
    quick_Sort(arr, pi + 1, high);
  }
  return arr;
}