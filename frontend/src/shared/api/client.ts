const BASE_URL = '/api';

export interface RequestOptions {
    signal?: AbortSignal;
}

export class ApiError extends Error {
    readonly status: number;
    readonly details?: unknown;

    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

function buildHeaders(init?: HeadersInit): Headers {
    const headers = new Headers(init);
    if (!headers.has('Content-Type'))
        headers.set('Content-Type', 'application/json');
    return headers;
}

// 201/200 с пустым телом — валидный ответ, response.json() на нём бросает SyntaxError
async function parseBody<T>(response: Response): Promise<T> {
    if (response.status === 204) return undefined as T;
    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: buildHeaders(init?.headers),
    });

    if (!response.ok) {
        const body = await parseBody<{ message?: string; errors?: unknown }>(
            response,
        ).catch(() => null);
        throw new ApiError(
            response.status,
            body?.message ?? response.statusText,
            body?.errors,
        );
    }

    return parseBody<T>(response);
}

export const apiClient = {
    get: <T>(path: string, options?: RequestOptions) =>
        request<T>(path, { signal: options?.signal }),
    post: <T>(path: string, body: unknown, options?: RequestOptions) =>
        request<T>(path, {
            method: 'POST',
            body: JSON.stringify(body),
            signal: options?.signal,
        }),
    put: <T>(path: string, body: unknown, options?: RequestOptions) =>
        request<T>(path, {
            method: 'PUT',
            body: JSON.stringify(body),
            signal: options?.signal,
        }),
    delete: (path: string, options?: RequestOptions) =>
        request<void>(path, { method: 'DELETE', signal: options?.signal }),
};
