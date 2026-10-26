import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { HttpError } from '../shared/errors/http-error.js';
import { z } from 'zod';

export const validateBody = (schema: ZodType) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body ?? {});


        if (!result.success) {

            throw new HttpError(400, 'Invalid data', z.flattenError(result.error).fieldErrors);
        }
        req.body = result.data;
        next();
    };