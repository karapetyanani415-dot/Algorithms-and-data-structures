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
