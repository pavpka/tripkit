import type { packingItems } from '../../db/schema.js';

export type Category = typeof packingItems.$inferSelect['category'];

export type PackingItem = typeof packingItems.$inferSelect;

export type CreatePackingItemDto = Omit<PackingItem, 'id'>;

export type UpdatePackingItemDto = Omit<CreatePackingItemDto, 'tripId'>;