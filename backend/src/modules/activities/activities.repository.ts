import type { Activity, UpdateActivityDto } from "./activities.types.js";
import { db } from "../../db.js";
import { activities as activitiesTable } from "../../db/schema.js";
import { eq, and, asc, SQL, sql } from "drizzle-orm";
import type { CreateActivityDto } from "./activities.types.js";


const nextOrder = (tripId: string, dayId: string | null): SQL<number> => sql`(
    SELECT COALESCE(MAX(${activitiesTable.order}) + 1, 0) FROM ${activitiesTable}
    WHERE ${activitiesTable.tripId} = ${tripId} AND ${activitiesTable.dayId} IS NOT DISTINCT FROM ${dayId}
  )`;

export interface ActivitiesRepository {
    getAllByTripId(tripId: string): Promise<Activity[]>;
    create(activity: CreateActivityDto): Promise<Activity>;
    update(id: string, tripId: string, activity: UpdateActivityDto): Promise<void>;
    delete(id: string, tripId: string): Promise<void>;
}

export class PostgresActivitiesRepository implements ActivitiesRepository {
    async getAllByTripId(tripId: string): Promise<Activity[]> {
        const activities = await db.select().from(activitiesTable)
            .where(eq(activitiesTable.tripId, tripId))
            .orderBy(asc(activitiesTable.order));
        return activities;
    }

    async create(activity: CreateActivityDto): Promise<Activity> {
        const [newActivity] = await db.insert(activitiesTable)
            .values({ ...activity, order: nextOrder(activity.tripId, activity.dayId) })
            .onConflictDoNothing({ target: activitiesTable.id })
            .returning();

        if (!newActivity) {
            throw new Error('Failed to create activity');
        }
        return newActivity;
    }
    async update(id: string, tripId: string, activity: UpdateActivityDto): Promise<void> {
        await db.update(activitiesTable).set(activity)
            .where(and(eq(activitiesTable.id, id), eq(activitiesTable.tripId, tripId)));
    }
    async delete(id: string, tripId: string): Promise<void> {
        await db.delete(activitiesTable)
            .where(and(eq(activitiesTable.id, id), eq(activitiesTable.tripId, tripId)));
    }
}