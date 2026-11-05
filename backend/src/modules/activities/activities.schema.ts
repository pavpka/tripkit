import { z } from 'zod';

export const createActivitySchema = z.object({
    dayId: z.string().nullable().default(null),
    order: z.number().min(0),
    title: z.string(),
    type: z.enum(['sight', 'food', 'transport', 'hotel', 'shopping', 'other']),
    address: z.string().nullable().default(null),
    start_time: z.iso.time().nullable().default(null),
    end_time: z.iso.time().nullable().default(null),
    cost_estimate: z.number().min(0).nullable().default(null),
    booking_status: z.enum(['todo', 'booked']).nullable().default(null),
    note: z.string().nullable().default(null),
}).refine((data) => {
    if (data.start_time !== null && data.end_time !== null && data.start_time < data.end_time) {
        { message: "Start time must be before end time" }
    }
    return true;
});

export type CreateActivityBody = z.infer<typeof createActivitySchema>;