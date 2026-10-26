import { z } from 'zod';

export const createActivitySchema = z.object({
    dayId: z.string().nullable(),
    order: z.number().min(0),
    title: z.string(),
    type: z.enum(['sight', 'food', 'transport', 'hotel', 'shopping', 'other']),
    address: z.string().nullable(),
    startTime: z.iso.time().nullable(),
    endTime: z.iso.time().nullable(),
    cost_estimate: z.number().min(0).nullable(),
    booking_status: z.enum(['todo', 'booked']).nullable(),
    note: z.string().nullable(),
}).refine((data) => {
    if (data.startTime !== null && data.endTime !== null && data.startTime < data.endTime) {
        { message: "Start time must be before end time" }
    }
});

export type CreateActivityBody = z.infer<typeof createActivitySchema>;