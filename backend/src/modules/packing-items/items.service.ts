import type { PackingItemsRepository } from "./items.repository.js";
import type { CreatePackingItemDto, PackingItem, UpdatePackingItemDto } from "./items.types.js";

export class PackingItemsService {
    constructor(private readonly repo: PackingItemsRepository) { }

    async getAllByTripId(tripId: string): Promise<PackingItem[]> {
        return this.repo.getAllByTripId(tripId);
    }
    async create(packingItem: CreatePackingItemDto): Promise<PackingItem> {
        return this.repo.create(packingItem);
    }
    async delete(id: string, tripId: string): Promise<void> {
        return this.repo.delete(id, tripId);
    }
    async update(id: string, tripId: string, packingItem: UpdatePackingItemDto): Promise<void> {
        return this.repo.update(id, tripId, packingItem);
    }
}