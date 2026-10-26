import { z } from 'zod';

export const createPackingItemSchema = z.object({
    label: z.string().min(1),
    qty: z.number().int().positive(),
    packed: z.boolean().default(false),
    category: z.enum(['clothes', 'docs', 'tech', 'hygiene', 'other']),
});

export type CreatePackingItemBody = z.infer<typeof createPackingItemSchema>;