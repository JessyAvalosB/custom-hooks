export interface FetchOptions extends RequestInit {
    headers?: HeadersInit
}

export interface FetchResponse<T, G> {
    data: T | null;
    error: string | null;
    loading: boolean;
    get: () => void;
    post: (body: G) => void;
    put: (body: G) => void;
    delete: () => void;
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
