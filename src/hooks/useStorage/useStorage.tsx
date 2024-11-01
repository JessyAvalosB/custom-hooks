import { useState } from 'react';
import { StorageType } from './useStorage.interface';

/**
 * Custom hook to manage browser storage (localStorage or sessionStorage)
 * with a reactive state.
 *
 * @param key The storage key to use.
 * @param initialValue The initial value to store, if no existing value is found.
 * @param storageType The type of storage to use: 'local' for localStorage or 'session' for sessionStorage.
 * @returns An array containing the current stored value, a setter function, and a function to remove the value.
 *
 * ### Example:
 * ```typescript
 * const [value, setValue, removeValue] = useStorage('user', { name: 'John' });
 *
 * setValue({ name: 'Jane' }); // Updates the stored value
 * removeValue(); // Removes the stored item
 * ```
 */
const useStorage = <T,>(key: string, initialValue: T, storageType: StorageType = 'local') => {
    const storage = storageType === 'local' ? localStorage : sessionStorage;

    const getStoredValue = () => {
        try {
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error parsing stored data for key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            storage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting value in storage for key "${key}":`, error);
        }
    };

    const removeValue = () => {
        try {
            storage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing value in storage for key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue] as const;
};

export default useStorage;
