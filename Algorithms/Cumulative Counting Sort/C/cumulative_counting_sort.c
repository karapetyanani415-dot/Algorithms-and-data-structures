#include <stdio.h>
#include <stdlib.h>

void findMinMax(int arr[], int n, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min){
            *min = arr[i];
        }
        if (arr[i] > *max) {
            *max = arr[i];
        }
    }
}

void cumulative_counting_sort(int arr[], int n) {
    int min = 0;
    int max = 0;
    findMinMax(arr, n, &min, &max);
    int *count = (int *)calloc(max - min + 1, sizeof(int));
    int *output = (int *)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }
    for (int i = 1; i < max - min + 1; i++) {
        count[i] += count[i - 1];
    }
    for (int i = n - 1; i >= 0; i--) {
        int idx = arr[i] - min;
        int pos = count[idx] - 1;
        output[pos] = arr[i];
        count[idx]--;
    }
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    free(count);
    free(output);
}

int main()
{
    int arr[] = {4, -2, -2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    cumulative_counting_sort(arr, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}