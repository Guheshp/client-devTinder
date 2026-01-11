import { useState, useEffect } from 'react';

/**
 * Custom hook that delays updating a value until a specified delay has passed.
 * @param {any} value - The value to debounce (e.g., search query)
 * @param {number} delay - The delay in milliseconds (default 300ms)
 * @returns {any} - The debounced value
 */
const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup the timer if the value changes before the delay expires
        // (This is what effectively "cancels" the previous update)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
