import type { TripsRepository } from './trips.repository.js';
import type { CreateTripInput } from './trips.types.js';
import { HttpError } from '../../shared/errors/http-error.js';
import type { Trip } from './trips.types.js';

export class TripsService {
    constructor(private readonly repo: TripsRepository) { }

    async getAll(ownerId: string): Promise<Trip[]> {
        return this.repo.findAll(ownerId);
    }
    async getById(id: string, ownerId: string): Promise<Trip> {
        const trip = await this.repo.findById(id, ownerId);
        if (!trip) throw new HttpError(404, `Trip ${id} not found`);
        return trip;
    }
    async create(trip: CreateTripInput, ownerId: string): Promise<Trip> {
        return this.repo.create(trip, ownerId);
    }
    async delete(id: string, ownerId: string): Promise<void> {
        if (!await this.repo.delete(id, ownerId)) throw new HttpError(404, `Trip ${id} not found`);
    }
    async update(id: string, trip: CreateTripInput, ownerId: string): Promise<void> {
        if (!await this.repo.update(id, trip, ownerId)) throw new HttpError(404, `Trip ${id} not found`);
    }
}