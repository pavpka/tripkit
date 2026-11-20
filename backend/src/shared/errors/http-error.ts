// src/shared/errors/http-error.ts
export class HttpError extends Error {
    readonly status: number;
    readonly details?: unknown;
    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.details = details;
    }
}

export class ConflictError extends HttpError { constructor(m: string) { super(409, m); } }
export class UnauthorizedError extends HttpError { constructor(m: string) { super(401, m); } }