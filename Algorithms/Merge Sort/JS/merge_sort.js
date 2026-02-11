function merge(nums1, nums2) {
    let size1 = nums1.length
    let size2 = nums2.length
    let result = []
    let i = 0
    let j = 0
    while (i < size1 && j < size2) {
        if (nums1[i] <= nums2[j]) {
            result.push(nums1[i++])
        } else {
            result.push(nums2[j++])
        }
    }
    while (i < size1) {
        result.push(nums1[i++])
    }
    while (j < size2) {
        result.push(nums2[j++])
    }
    return result
}

function merge_sort(nums) {
    if (nums.length <= 1) {
        return nums
    }
    let mid = Math.floor(nums.length / 2)
    let left = nums.slice(0, mid)
    let rigth = nums.slice(mid)
    let sorted_left = merge_sort(left)
    let sorted_rigth = merge_sort(rigth)

    return merge(sorted_left, sorted_rigth)
}
