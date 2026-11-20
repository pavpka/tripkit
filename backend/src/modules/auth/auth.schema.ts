import { z } from "zod";

export const registerBody = z.object({
    email: z.string().trim().toLowerCase().email().max(254),
    password: z.string().min(8).max(128),
    name: z.string().trim().max(100).optional(),
}).strict();
export const loginBody = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(1).max(128),
}).strict();

export type RegisterBody = z.infer<typeof registerBody>;
export type LoginBody = z.infer<typeof loginBody>;