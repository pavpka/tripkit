import type { CreateTripDto, Trip } from './trips.types.js';
import { db } from '../../db.js';
import { trips as tripsTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import type { DaysRepository } from '../days/days.repository.js';

export interface TripsRepository {
    findAll(): Promise<Trip[]>;
    findById(id: string): Promise<Trip | undefined>;
    create(trip: CreateTripDto): Promise<Trip>;
    delete(id: string): Promise<void>;
    update(id: string, trip: CreateTripDto): Promise<void>;
}


export class PostgresTripsRepository implements TripsRepository {
    constructor(private readonly daysRepository: DaysRepository) { }

    async findAll(): Promise<Trip[]> {
        const trips = await db.select().from(tripsTable);
        return trips;
    }
    async findById(id: string): Promise<Trip | undefined> {
        const trip = await db.select().from(tripsTable).where(eq(tripsTable.id, id));
        return trip[0];
    }
    async create(trip: CreateTripDto): Promise<Trip> {
        return db.transaction(async (tx) => {
            const [newTrip] = await tx.insert(tripsTable).values(trip).returning();
            if (!newTrip) {
                throw new Error('Failed to create trip');
            }

            if (newTrip.startDate && newTrip.endDate) {
                await this.daysRepository.syncWithDateRange(newTrip.id, newTrip.startDate, newTrip.endDate, tx);
            }
            return newTrip;
        });
    }
    async delete(id: string): Promise<void> {
        await db.delete(tripsTable).where(eq(tripsTable.id, id));
    }
    async update(id: string, trip: CreateTripDto): Promise<void> {
        return db.transaction(async (tx) => {
            const [updatedTrip] = await tx.update(tripsTable).set(trip).where(eq(tripsTable.id, id)).returning();
            if (!updatedTrip) {
                throw new Error('Failed to update trip');
            }

            if (updatedTrip.startDate && updatedTrip.endDate) {
                await this.daysRepository.syncWithDateRange(id, updatedTrip.startDate, updatedTrip.endDate, tx);
            }
            else {
                await this.daysRepository.deleteAllByTripId(id, tx);
            }
        });
    }
}