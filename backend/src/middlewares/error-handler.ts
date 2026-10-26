import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../shared/errors/http-error.js';

function hasStatus(err: unknown): err is { status: number } {
    if (typeof err !== 'object' || err === null) return false;
    const status = (err as { status?: unknown }).status;
    return typeof status === 'number' && status >= 400 && status <= 599;
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);

    if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message, errors: err.details });
        return;
    }
    

    const status = hasStatus(err) ? err.status : 500;
    const message =  status < 500 ? 'Bad Request' : 'Internal Server Error';
    res.status(status).json({ message });
}