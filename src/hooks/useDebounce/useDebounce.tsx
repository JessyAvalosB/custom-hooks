import { useEffect, useState } from "react"


/**
 * Custom hook to debounce a value, delaying updates to the value until after a specified delay has passed since the last change.
 * 
 * @template T - The type of the value being debounced.
 * 
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * 
 * @returns {T} - The debounced version of the input value, which only updates after the delay.
 * 
 * @example
 * const SearchComponent = () => {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *         // Fetch data only when the debounced search term changes
 *         fetchData(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 * 
 *   return (
 *    <input
 *       type="text"
 *       placeholder="Search..."
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *     />
 *   );
 * };
 */
const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;