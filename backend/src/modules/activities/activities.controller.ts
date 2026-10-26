import type { ActivitiesService } from "./activities.service.js";
import type { Request, Response } from "express";
import type { UpdateActivityDto } from "./activities.types.js";

export class ActivitiesController {
    constructor(private readonly service: ActivitiesService) { }
    getAllByTripId = async (req: Request<{ tripId: string }>, res: Response) => {
        const activities = await this.service.getAllByTripId(req.params.tripId);
        res.json(activities);
    };
    create = async (req: Request<{ tripId: string }, {}, UpdateActivityDto>, res: Response) => {
        const activity = await this.service.create({ ...req.body, tripId: req.params.tripId });
        res.status(201).json('Activity created! Activity ID: ' + activity.id);
    };
    delete = async (req: Request<{ id: string, tripId: string }>, res: Response) => {
        await this.service.delete(req.params.id, req.params.tripId);
        res.status(204).end();
    };
    update = async (req: Request<{ id: string, tripId: string }, {}, UpdateActivityDto>, res: Response) => {
        await this.service.update(req.params.id, req.params.tripId, req.body);
        res.status(204).end();
    };
}