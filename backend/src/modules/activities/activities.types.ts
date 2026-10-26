import type { activities } from "../../db/schema.js";


export type Activity = typeof activities.$inferSelect;

export type CreateActivityDto = Omit<Activity, 'id' >;

export type UpdateActivityDto = Omit<CreateActivityDto, 'tripId'>;