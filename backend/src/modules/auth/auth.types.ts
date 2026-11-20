import type { users } from '../../db/schema.js';
import type { sessions } from '../../db/schema.js';
import type { registerBody, loginBody } from './auth.schema.js';
import type { z } from 'zod';

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;

export type RegisterBody = z.infer<typeof registerBody>;
export type LoginBody = z.infer<typeof loginBody>;
