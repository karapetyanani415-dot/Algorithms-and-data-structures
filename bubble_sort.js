function bubble_sort(arr) {
    let cmp = true
    for (let i = 0; i < arr.length - 1; ++i) {
        cmp = false
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                cmp = true
            }
        }
        if (cmp === false) {
            break
        }
    }
}

var arr = [5, 4, 3, 2, 1]
bubble_sort(arr)
console.log(arr)
