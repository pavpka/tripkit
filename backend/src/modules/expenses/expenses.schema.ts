import { z } from "zod";
import { currency } from "../../db/schema.js";

export const createExpenseSchema = z.object({
    activityId: z.string().nullable().default(null),
    category: z.enum(['transport', 'hotel', 'food', 'tickets', 'shopping', 'other']),
    amount: z.number().min(0),
    currency: z.enum(currency.enumValues),
    date: z.iso.date(),
    note: z.string().nullable().default(null)
});

export type CreateExpenseBody = z.infer<typeof createExpenseSchema>;
