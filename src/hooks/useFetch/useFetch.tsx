import { useState, useCallback } from 'react';
import { HTTPMethod, FetchOptions, FetchResponse } from './useFetch.interface'

/**
 * Custom hook to make HTTP requests using fetch API
 * 
 * @template T Type of the response data
 * @template G Type of the request body for POST and PUT methods (optional, defaults to null)
 * 
 * @param {string} url - URL endpoint for the request
 * @param {FetchOptions} options - Configuration options for the request
 * 
 * @returns {FetchResponse<T, G>} An object containing:
 * - `data` {T | null} - The response data from the API
 * - `error` {string | null} - The error message if an error occurred
 * - `loading` {boolean} - Loading state to indicate if the request is in progress
 * - `get` {() => void} - Function to perform a GET request
 * - `post` {(body: G) => void} - Function to perform a POST request with a request body
 * - `put` {(body: G) => void} - Function to perform a PUT request with a request body
 * - `delete` {() => void} - Function to perform a DELETE request
 */
const useFetch = <T, G = null>(url: string, options: FetchOptions = {}): FetchResponse<T, G> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(
        async <G,>(method: HTTPMethod = 'GET', body: G | null = null) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url, {
                    ...options,
                    method,
                    headers: {
                        'content-type': 'application/json',
                        ...options.headers,
                    },
                    body: body ? JSON.stringify(body) : null,
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }
        , [url, options])

    return {
        data,
        error,
        loading,
        get: () => request('GET'),
        post: (body: G) => request<G>('POST', body),
        put: (body: G) => request<G>('PUT', body),
        delete: () => request('DELETE'),
    }
}

export default useFetch;