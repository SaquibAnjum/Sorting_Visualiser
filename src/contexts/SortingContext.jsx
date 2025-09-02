import { createContext, useState } from "react";

import { getRandomNumber, getDigit, mostDigits } from "../helpers/math";
import { awaitTimeout } from "../helpers/promises";

export const SortingContext = createContext();
const speedMap = {
    "slow": 1000,
    "normal": 500,
    "fast": 250
}

function SortingProvider({ children }) {
    const [sortingState, setSortingState] = useState({
        array: [],
        delay: speedMap["slow"],
        algorithm: "bubble_sort",
        sorted: false,
        sorting: false,
        cancellationToken: null
    });

    const changeBar = (index, payload) => {
        setSortingState((prev) => ({
            ...prev,
            array: prev.array.map((item, i) => (i === index ? { ...item, ...payload } : item)),
        }));
    };

    const generateSortingArray = (sorting) => {
        setSortingState((prev) => {
            // If sorting is currently running, cancel it
            if (prev.sorting && prev.cancellationToken) {
                prev.cancellationToken.cancelled = true;
            }

            const generatedArray = Array.from({ length: 12 }, () => {
                return {
                    value: getRandomNumber(60, 1000),
                    state: "idle",
                };
            });

            return {
                ...prev,
                array: generatedArray,
                sorted: false,
                sorting: sorting || false,
                cancellationToken: null
            };
        });
    };

    const bubbleSort = async (cancellationToken) => {
        // Immediate cancellation check
        if (cancellationToken.cancelled) return;
        
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 0; i < arr.length; i++) {
            if (cancellationToken.cancelled) return;
            
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (cancellationToken.cancelled) return;
                
                changeBar(j, { state: "selected" });
                changeBar(j + 1, { state: "selected" });
                await awaitTimeout(sortingState.delay);

                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    changeBar(j, { value: arr[j + 1] });
                    arr[j + 1] = temp;
                    changeBar(j + 1, { value: temp });
                    await awaitTimeout(sortingState.delay);
                }

                changeBar(j, { state: "idle" });
                changeBar(j + 1, { state: "idle" });
            }
        }
    };

    const insertionSort = async (cancellationToken) => {
        // Immediate cancellation check
        if (cancellationToken.cancelled) return;
        
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 1; i < arr.length; i++) {
            if (cancellationToken.cancelled) return;
            
            let current = arr[i];
            let j = i - 1;

            changeBar(i, { value: current, state: "selected" });

            while (j > -1 && current < arr[j]) {
                if (cancellationToken.cancelled) return;
                
                arr[j + 1] = arr[j];
                changeBar(j + 1, { value: arr[j], state: "selected" });
                j--;
                await awaitTimeout(sortingState.delay);
                changeBar(j + 2, { value: arr[j + 1], state: "idle" });
            }

            arr[j + 1] = current;
            changeBar(j + 1, { value: current, state: "idle" });
        }
    };

    const selectionSort = async (cancellationToken) => {
        // Immediate cancellation check
        if (cancellationToken.cancelled) return;
        
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 0; i < arr.length; i++) {
            if (cancellationToken.cancelled) return;
            
            let min = i;
            changeBar(min, { state: "selected" });

            for (let j = i + 1; j < arr.length; j++) {
                if (cancellationToken.cancelled) return;
                
                changeBar(j, { state: "selected" });
                await awaitTimeout(sortingState.delay);

                if (arr[j] < arr[min]) {
                    changeBar(min, { state: "idle" });
                    min = j;
                    changeBar(min, { state: "selected" });
                } else {
                    changeBar(j, { state: "idle" });
                }
            }

            if (min !== i) {
                let temp = arr[i];
                arr[i] = arr[min];
                changeBar(i, { value: arr[min], state: "idle" });
                arr[min] = temp;
                changeBar(min, { value: temp, state: "idle" });
            } else {
                changeBar(i, { state: "idle" });
                changeBar(min, { state: "idle" });
            }
        }
    };

    const mergeSort = async (cancellationToken) => {
        // Immediate cancellation check
        if (cancellationToken.cancelled) return;
        
        const arr = sortingState.array.map((item) => item.value);
        await mergeSortHelper(arr, 0, arr.length - 1, cancellationToken);
    };
    
    async function mergeSortHelper(arr, start = 0, end = arr.length - 1, cancellationToken) {
        if (cancellationToken.cancelled) return;
        if (start >= end) return;

        const middle = Math.floor((start + end) / 2);
        await mergeSortHelper(arr, start, middle, cancellationToken);
        await mergeSortHelper(arr, middle + 1, end, cancellationToken);
        await mergeSortMerger(arr, start, middle, end, cancellationToken);
    }
    
    async function mergeSortMerger(arr, start, middle, end, cancellationToken) {
        let left = arr.slice(start, middle + 1);
        let right = arr.slice(middle + 1, end + 1);

        let i = 0,
            j = 0,
            k = start;

        while (i < left.length && j < right.length) {
            if (cancellationToken.cancelled) return;
            
            if (left[i] < right[j]) {
                changeBar(k, { value: left[i], state: "selected" });
                arr[k++] = left[i++];
            } else {
                changeBar(k, { value: right[j], state: "selected" });
                arr[k++] = right[j++];
            }
            await awaitTimeout(sortingState.delay);
        }

        while (i < left.length) {
            if (cancellationToken.cancelled) return;
            
            changeBar(k, { value: left[i], state: "selected" });
            arr[k++] = left[i++];
            await awaitTimeout(sortingState.delay);
        }

        while (j < right.length) {
            if (cancellationToken.cancelled) return;
            
            changeBar(k, { value: right[j], state: "selected" });
            arr[k++] = right[j++];
            await awaitTimeout(sortingState.delay);
        }

        for (let i = start; i <= end; i++) {
            if (cancellationToken.cancelled) return;
            changeBar(i, { value: arr[i], state: "idle" });
        }
    }

    const quickSort = async (cancellationToken) => {
        // Immediate cancellation check
        if (cancellationToken.cancelled) return;
        
        const arr = sortingState.array.map((item) => item.value);
        await quickSortHelper(arr, 0, arr.length - 1, cancellationToken);
    };
    
    const quickSortHelper = async (arr, start = 0, end = arr.length - 1, cancellationToken) => {
        if (cancellationToken.cancelled) return;
        if (start >= end) {
            return;
        }

        const pivot = arr[Math.floor((start + end) / 2)];
        let i = start;
        let j = end;

        while (i <= j) {
            if (cancellationToken.cancelled) return;
            
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;

            if (i <= j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                changeBar(i, { value: arr[i], state: "selected" });
                changeBar(j, { value: arr[j], state: "selected" });

                await awaitTimeout(sortingState.delay);

                changeBar(i, { value: arr[i], state: "idle" });
                changeBar(j, { value: arr[j], state: "idle" });
                i++;
                j--;
            }
        }

        await quickSortHelper(arr, start, j, cancellationToken);
        await quickSortHelper(arr, i, end, cancellationToken);
    }

    const radixSort = async (cancellationToken) => {
        // Immediate cancellation check
        if (cancellationToken.cancelled) return;
        
        let arr = sortingState.array.map((item) => item.value);
        let maxDigitCount = mostDigits(arr);

        for (let k = 0; k < maxDigitCount; k++) {
            if (cancellationToken.cancelled) return;
            
            let digitBuckets = Array.from({ length: 10 }, () => []);
            for (let i = 0; i < arr.length; i++) {
                if (cancellationToken.cancelled) return;
                
                let digit = getDigit(arr[i], k);
                digitBuckets[digit].push(arr[i]);
            }

            arr = [].concat(...digitBuckets);

            for (let i = 0; i < arr.length; i++) {
                if (cancellationToken.cancelled) return;
                
                changeBar(i, { value: arr[i], state: "selected" });
                await awaitTimeout(sortingState.delay);
                changeBar(i, { value: arr[i], state: "idle" });
            }
        }
    };

    const algorithmMap = {
        "bubble_sort": bubbleSort,
        "insertion_sort": insertionSort,
        "selection_sort": selectionSort,
        "merge_sort": mergeSort,
        "quick_sort": quickSort,
        "radix_sort": radixSort
    }

    const startVisualizing = async () => {
        setSortingState((prev) => {
            // If sorting is already running, cancel the current operation immediately
            if (prev.sorting && prev.cancellationToken) {
                prev.cancellationToken.cancelled = true;
            }

            // Create a new cancellation token
            const cancellationToken = { cancelled: false };

            // Start the sorting process immediately
            const startSorting = async () => {
                try {
                    // Small delay to ensure UI updates before starting
                    await awaitTimeout(10);
                    await algorithmMap[prev.algorithm](cancellationToken);
                    
                    // Only mark as sorted if the operation wasn't cancelled
                    if (!cancellationToken.cancelled) {
                        setSortingState((current) => ({
                            ...current,
                            sorted: true,
                            sorting: false,
                            cancellationToken: null
                        }));
                    }
                } catch (error) {
                    // Handle any errors and ensure sorting state is reset
                    setSortingState((current) => ({
                        ...current,
                        sorting: false,
                        cancellationToken: null
                    }));
                }
            };

            // Start the sorting process immediately
            startSorting();

            return {
                ...prev,
                sorting: true,
                cancellationToken
            };
        });
    }

    const changeSortingSpeed = (e) => {
        setSortingState((prev) => ({
            ...prev,
            delay: speedMap[e.target.value] || 500
        }))
    }

    const changeAlgorithm = (algorithm) => {
        setSortingState((prev) => {
            // Immediately cancel any ongoing sorting operation
            if (prev.sorting && prev.cancellationToken) {
                prev.cancellationToken.cancelled = true;
            }

            return {
                ...prev,
                algorithm,
                sorted: false,
                sorting: false,
                cancellationToken: null,
                array: prev.array.map(item => ({
                    ...item,
                    state: "idle"
                }))
            };
        });
    }

    return (
        <SortingContext.Provider
            value={{
                sortingState,
                generateSortingArray,
                startVisualizing,
                changeSortingSpeed,
                changeAlgorithm
            }}
        >
            {children}
        </SortingContext.Provider>
    );
}

export default SortingProvider;
