import { db } from '../../db.js';
import { packingItems } from '../../db/schema.js';
import type { PackingItem, CreatePackingItemDto, UpdatePackingItemDto } from './items.types.js';
import { eq, and } from 'drizzle-orm';

export interface PackingItemsRepository {
    getAllByTripId(tripId: string): Promise<PackingItem[]>;
    create(packingItem: CreatePackingItemDto): Promise<PackingItem>;
    delete(id: string, tripId: string): Promise<void>;
    update(id: string, tripId: string, packingItem: UpdatePackingItemDto): Promise<void>;
}

export class PostgresPackingItemsRepository implements PackingItemsRepository {
    async getAllByTripId(tripId: string): Promise<PackingItem[]> {
        const items = await db.select().from(packingItems).where(eq(packingItems.tripId, tripId));
        return items;
    }
    async create(packingItem: CreatePackingItemDto): Promise<PackingItem> {
        const [item] = await db.insert(packingItems).values(packingItem).returning();
        if (!item) {
            throw new Error('Failed to create packing item');
        }
        return item;
    }
    async delete(id: string, tripId: string): Promise<void> {
        await db.delete(packingItems).where(and(eq(packingItems.id, id), eq(packingItems.tripId, tripId)));
    }
    async update(id: string, tripId: string, packingItem: UpdatePackingItemDto): Promise<void> {
        await db.update(packingItems).set(packingItem).where(and(eq(packingItems.id, id), eq(packingItems.tripId, tripId)));
    }
}