import { HttpError } from "../../shared/errors/http-error.js";
import type { ActivitiesRepository } from "./activities.repository.js";
import type { Activity, CreateActivityDto, UpdateActivityDto } from "./activities.types.js";


export class ActivitiesService {
    constructor(private readonly repo: ActivitiesRepository) { }

    async getAllByTripId(tripId: string): Promise<Activity[]> {
        return this.repo.getAllByTripId(tripId);
    }
    async create(activity: CreateActivityDto): Promise<Activity> {
        return this.repo.create(activity);
    }
    async update(id: string, tripId: string, activity: UpdateActivityDto): Promise<void> {
        return this.repo.update(id, tripId, activity);
    }
    async delete(id: string, tripId: string): Promise<void> {
        return this.repo.delete(id, tripId);
    }
}