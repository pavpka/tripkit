import type { days } from "../../db/schema.js";


export type Day = typeof days.$inferSelect;

export type CreateDayDto = Omit<Day, 'id' >;

export type UpdateDayDto = Omit<CreateDayDto, 'tripId'>;