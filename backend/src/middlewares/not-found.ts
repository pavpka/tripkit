import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../shared/errors/http-error.js';

export function notFound(req: Request, _res: Response, next: NextFunction) {
    next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
}