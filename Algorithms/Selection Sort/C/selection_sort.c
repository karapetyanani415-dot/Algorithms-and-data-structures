#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int idx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[idx])
            {
                idx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[idx];
        arr[idx] = temp;
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    selection_sort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    return 0;
}
