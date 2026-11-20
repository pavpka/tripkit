import type { Request, Response, NextFunction } from 'express';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../db.js';
import { trips } from '../../db/schema.js';
import { HttpError, UnauthorizedError } from '../../shared/errors/http-error.js';

const tripIdSchema = z.string().uuid();

export async function requireTripOwner(
    req: Request<{ tripId?: string }>,
    _res: Response,
    next: NextFunction,
) {
    try {
        const userId = req.user?.id;
        if (!userId) return next(new UnauthorizedError('Требуется вход'));

        const tripId = tripIdSchema.safeParse(req.params.tripId);
        if (!tripId.success) return next(new HttpError(404, 'Trip not found'));

        const [row] = await db
            .select({ id: trips.id })
            .from(trips)
            .where(and(eq(trips.id, tripId.data), eq(trips.ownerId, userId)))
            .limit(1);

        if (!row) return next(new HttpError(404, `Trip ${tripId.data} not found`));
        next();
    } catch (e) {
        next(e);
    }
}