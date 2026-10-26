import { z } from 'zod';

export const createDaySchema = z.object({
    date: z.iso.date(),
    title: z.string(),
});

export type CreateDayBody = z.infer<typeof createDaySchema>;