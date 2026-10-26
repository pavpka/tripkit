import type { CreateDayDto, UpdateDayDto } from "./days.types.js";
import type { Day } from "./days.types.js";
import { db, type DbExecutor } from "../../db.js";
import { days } from "../../db/schema.js";
import { eq, and, lt, gt, or, asc } from 'drizzle-orm';


export interface DaysRepository {
    getAllByTripId(tripId: string): Promise<Day[]>;
    create(day: CreateDayDto): Promise<Day>;
    delete(id: string, tripId: string): Promise<void>;
    update(id: string, tripId: string, day: UpdateDayDto): Promise<void>;
    syncWithDateRange(tripId: string, startDate: string, endDate: string, executor?: DbExecutor): Promise<void>;
    deleteAllByTripId(tripId: string, executor?: DbExecutor): Promise<void>;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function buildTripDays(tripId: string, startDate: string, endDate: string) {
    const start = Date.parse(startDate);
    const count = Math.round((Date.parse(endDate) - start) / DAY_MS) + 1;
    return Array.from({ length: count }, (_, i) => ({
        tripId,
        date: new Date(start + i * DAY_MS).toISOString().slice(0, 10),
        title: `Day ${i + 1}`,
    }));
}

export class PostgresDaysRepository implements DaysRepository {
    async getAllByTripId(tripId: string): Promise<Day[]> {
        const daysList = await db.select().from(days).where(eq(days.tripId, tripId)).orderBy(asc(days.date));
        return daysList;
    }
    async create(day: CreateDayDto): Promise<Day> {
        const [newDay] = await db.insert(days).values(day).returning();
        if (!newDay) {
            throw new Error('Failed to create day');
        }
        return newDay;
    }
    async delete(id: string, tripId: string): Promise<void> {
        await db.delete(days).where(and(eq(days.id, id), eq(days.tripId, tripId)));
    }
    async update(id: string, tripId: string, day: UpdateDayDto): Promise<void> {
        await db.update(days).set(day).where(and(eq(days.id, id), eq(days.tripId, tripId)));
    }
    async syncWithDateRange(tripId: string, startDate: string, endDate: string, executor: DbExecutor = db): Promise<void> {
        await executor.delete(days).where(
            and(
                eq(days.tripId, tripId),
                or(lt(days.date, startDate), gt(days.date, endDate)),
            ),
        );
        await executor
        .insert(days)
        .values(buildTripDays(tripId, startDate, endDate))
        .onConflictDoNothing({ target: [days.tripId, days.date] });
    }
    async deleteAllByTripId(tripId: string, executor: DbExecutor = db): Promise<void> {
        await executor.delete(days).where(eq(days.tripId, tripId));
    }
}