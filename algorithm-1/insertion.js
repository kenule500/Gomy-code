function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];          // The current element to insert
        let j = i - 1;

        // Move elements greater than key to one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        // Insert the key in the correct position
        arr[j + 1] = key;
    }

    return arr;
}
