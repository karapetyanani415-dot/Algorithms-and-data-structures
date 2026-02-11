#include <stdio.h>
#include <stdbool.h>

void bubble_sort(int arr[], int n) {
    bool cmp;
    for (int i = 0; i < n - 1; i++) {
        cmp = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                cmp = true;
            }
        }
        if (!cmp) {
            break;
        }
    }
}

int main() {
    int arr[] = {5, 4, 3, 2, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubble_sort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
