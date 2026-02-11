function search(nums, target) {
  function binarySearch(start, end) {
    if (start > end) return -1;
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] > target) {
      return binarySearch(start, mid - 1);
    }
    return binarySearch(mid + 1, end);
  }
  return binarySearch(0, nums.length - 1);
}
