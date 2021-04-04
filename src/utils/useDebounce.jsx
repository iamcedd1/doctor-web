import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        let handler;
        if (value) {
            handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
        } else {
            handler = setDebouncedValue(value);
        }

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
