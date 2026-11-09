import type { expenses } from "../../db/schema.js";

export type Expense = typeof expenses.$inferSelect;

export type CreateExpenseDto = Omit<Expense, 'id' >;

export type UpdateExpenseDto = Omit<CreateExpenseDto, 'tripId'>;