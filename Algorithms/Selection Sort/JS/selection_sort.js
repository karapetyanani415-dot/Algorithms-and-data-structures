function selection_sort(arr) {
    let n = arr.length
    for (let i = 0; i < n; ++i) {
        let idx = i
        for (let j = 0; j < n; ++j) {
            if (arr[idx] > arr[j]) {
                idx = j
            }
        }
        [arr[idx], arr[i]] = [arr[i], arr[idx]]
    }
}