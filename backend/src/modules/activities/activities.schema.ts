import { z } from 'zod';

export const createActivitySchema = z.object({
    dayId: z.string().nullable().default(null),
    order: z.number().min(0),
    title: z.string(),
    type: z.enum(['sight', 'food', 'transport', 'hotel', 'shopping', 'other']),
    address: z.string().nullable().default(null),
    startTime: z.iso.time().nullable().default(null),
    endTime: z.iso.time().nullable().default(null),
    costEstimate: z.number().min(0).nullable().default(null),
    bookingStatus: z.enum(['todo', 'booked']).nullable().default(null),
    note: z.string().nullable().default(null),
}).refine((data) => {
    if (data.startTime !== null && data.endTime !== null && data.startTime < data.endTime) {
        { message: "Start time must be before end time" }
    }
    return true;
});

export type CreateActivityBody = z.infer<typeof createActivitySchema>;