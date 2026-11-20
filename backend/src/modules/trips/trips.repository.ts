import type { CreateTripInput, Trip } from './trips.types.js';
import { db } from '../../db.js';
import { trips as tripsTable } from '../../db/schema.js';
import { and, eq } from 'drizzle-orm';
import type { DaysRepository } from '../days/days.repository.js';

export interface TripsRepository {
    findAll(ownerId: string): Promise<Trip[]>;
    findById(id: string, ownerId: string): Promise<Trip | undefined>;
    create(trip: CreateTripInput, ownerId: string): Promise<Trip>;
    delete(id: string, ownerId: string): Promise<boolean>;
    update(id: string, trip: CreateTripInput, ownerId: string): Promise<boolean>;
}


export class PostgresTripsRepository implements TripsRepository {
    constructor(private readonly daysRepository: DaysRepository) { }

    async findAll(ownerId: string): Promise<Trip[]> {
        const trips = await db.select().from(tripsTable).where(eq(tripsTable.ownerId, ownerId));
        return trips;
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