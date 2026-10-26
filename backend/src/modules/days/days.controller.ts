import type { DaysService } from "./days.service.js";
import type { Request, Response } from "express";
import type { CreateDayBody } from "./days.schema.js";
import type { UpdateDayDto } from "./days.types.js";


export class DaysController {
    constructor(private readonly service: DaysService) { }

    getAllByTripId = async (req: Request<{ tripId: string }>, res: Response) => {
        const days = await this.service.getAllByTripId(req.params.tripId);
        res.json(days);
    }
    create = async (req: Request<{ tripId: string }, {}, CreateDayBody>, res: Response) => {
        const day = await this.service.create({ ...req.body, tripId: req.params.tripId });
        res.status(201).json('Day created! Day ID: ' + day.id);
    }
    delete = async (req: Request<{ id: string, tripId: string }>, res: Response) => {
        await this.service.delete(req.params.id, req.params.tripId);
        res.status(204).end();
    }
    update = async (req: Request<{ id: string, tripId: string }, {}, UpdateDayDto>, res: Response) => {
        await this.service.update(req.params.id, req.params.tripId, req.body);
        res.status(200).json('Day updated!');
    }
}