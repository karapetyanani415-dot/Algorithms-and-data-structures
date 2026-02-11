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

