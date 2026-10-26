import type { DaysRepository } from "./days.repository.js";
import type { CreateDayDto, Day, UpdateDayDto } from "./days.types.js";


export class DaysService {
    constructor(private readonly repo: DaysRepository) { }

    async getAllByTripId(tripId: string): Promise<Day[]> {
        return this.repo.getAllByTripId(tripId);
    }
    async create(day: CreateDayDto): Promise<Day> {
        return this.repo.create(day);
    }
    async delete(id: string, tripId: string): Promise<void> {
        return this.repo.delete(id, tripId);
    }
    async update(id: string, tripId: string, day: UpdateDayDto): Promise<void> {
        return this.repo.update(id, tripId, day);
    }
}