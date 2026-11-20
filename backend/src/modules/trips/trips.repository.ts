import type { CreateTripInput, Trip } from './trips.types.js';
import { db } from '../../db.js';
import { activities, packingItems, trips as tripsTable } from '../../db/schema.js';
import { and, count, eq, getTableColumns, sql, sum } from 'drizzle-orm';
import type { DaysRepository } from '../days/days.repository.js';

export interface TripsRepository {
    findAll(ownerId: string): Promise<Trip[]>;
    findById(id: string, ownerId: string): Promise<Trip | undefined>;
    create(trip: CreateTripInput, ownerId: string): Promise<Trip>;
    delete(id: string, ownerId: string): Promise<boolean>;
    update(id: string, trip: CreateTripInput, ownerId: string): Promise<boolean>;
}

const plannedExpenses = db
    .select({
        tripId: activities.tripId,
        plannedExpense: sum(activities.costEstimate).as('planned_expense'),
    })
    .from(activities)
    .groupBy(activities.tripId)
    .as('planned_expenses');

const packingStats = db
    .select({
        tripId: packingItems.tripId,
        packingItemsCount: count().as('packing_items_count'),
        packedItemsCount: sql<number>`
            count(*) filter (where ${packingItems.packed})
        `.mapWith(Number).as('packed_items_count'),
    })
    .from(packingItems)
    .groupBy(packingItems.tripId)
    .as('packing_stats');

export class PostgresTripsRepository implements TripsRepository {
    constructor(private readonly daysRepository: DaysRepository) { }

    async findAll(ownerId: string): Promise<Trip[]> {
        const rows = await db
            .select({
                ...getTableColumns(tripsTable),
                plannedExpenses: plannedExpenses.plannedExpense,
                packingItemsCount: packingStats.packingItemsCount,
                packedItemsCount: packingStats.packedItemsCount,
            })
            .from(tripsTable)
            .leftJoin(plannedExpenses, eq(plannedExpenses.tripId, tripsTable.id))
            .leftJoin(packingStats, eq(packingStats.tripId, tripsTable.id))
            .where(eq(tripsTable.ownerId, ownerId));
        return rows.map((row) => ({
            ...row,
            plannedExpense: row.plannedExpenses ?? 0,
            packingItemsCount: row.packingItemsCount ?? 0,
            packedItemsCount: row.packedItemsCount ?? 0,
        }));
    }
    async findById(id: string, ownerId: string): Promise<Trip | undefined> {
        const [trip] = await db.select().from(tripsTable)
            .where(and(eq(tripsTable.id, id), eq(tripsTable.ownerId, ownerId)))
            .limit(1);
        return trip;
    }
    async create(trip: CreateTripInput, ownerId: string): Promise<Trip> {
        return db.transaction(async (tx) => {
            const [newTrip] = await tx.insert(tripsTable).values({ ...trip, ownerId }).returning();
            if (!newTrip) {
                throw new Error('Failed to create trip');
            }

            if (newTrip.startDate && newTrip.endDate) {
                await this.daysRepository.syncWithDateRange(newTrip.id, newTrip.startDate, newTrip.endDate, tx);
            }
            return newTrip;
        });
    }
    async delete(id: string, ownerId: string): Promise<boolean> {
        const deleted = await db.delete(tripsTable)
            .where(and(eq(tripsTable.id, id), eq(tripsTable.ownerId, ownerId)))
            .returning({ id: tripsTable.id });

        return deleted.length > 0;
    }
    async update(id: string, trip: CreateTripInput, ownerId: string): Promise<boolean> {
        return db.transaction(async (tx) => {
            const [updatedTrip] = await tx.update(tripsTable).set(trip)
                .where(and(eq(tripsTable.id, id), eq(tripsTable.ownerId, ownerId)))
                .returning();
            if (!updatedTrip) return false;

            if (updatedTrip.startDate && updatedTrip.endDate) {
                await this.daysRepository.syncWithDateRange(id, updatedTrip.startDate, updatedTrip.endDate, tx);
            }
            else {
                await this.daysRepository.deleteAllByTripId(id, tx);
            }
            return true;
        });
    }
}