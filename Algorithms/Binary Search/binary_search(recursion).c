#include <stdio.h>

int search(int nums[], int target, int start, int end) {
    if (start > end){
        return -1;
    }
    int mid = start + (end - start) / 2;
    if (nums[mid] == target)
        return mid;
    if (nums[mid] > target)
        return search(nums, target, start, mid - 1);

    return search(nums, target, mid + 1, end);
}

int main() {
    int nums[] = {1, 3, 5, 7, 9};
    int size = sizeof(nums) / sizeof(nums[0]);

    printf("%d\n", search(nums, 7, 0, size - 1));
    return 0;
}
