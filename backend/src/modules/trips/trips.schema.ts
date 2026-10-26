import { z } from 'zod';
import { tripStatus, currency } from '../../db/schema.js';

export const createTripSchema = z.object({
    title: z.string().min(1),
    destinations: z.array(z.string()).min(1),
    status: z.enum(tripStatus.enumValues).default('idea'),
    startDate: z.iso.date().nullable().default(null),
    endDate: z.iso.date().nullable().default(null),
    budget: z.number().int().nonnegative().nullable().default(null),
    currency: z.enum(currency.enumValues),
    travellersCount: z.number().int().positive().default(1),
    coverNote: z.string().nullable().default(null),
    emoji: z.string(),
    color: z.string(),
}).superRefine((data, ctx) => {
    if (data.status !== 'idea') {
        if (data.startDate === null) {
            ctx.addIssue({ code: 'custom', path: ['startDate'], message: 'Start date is required' });
        }
        if (data.endDate === null) {
            ctx.addIssue({ code: 'custom', path: ['endDate'], message: 'End date is required' });
        }
    }
    if (data.startDate !== null && data.endDate !== null && data.startDate > data.endDate) {
        ctx.addIssue({
            code: 'custom',
            message: 'Start date must be before end date',
            path: ['startDate'],
        });
    }
});