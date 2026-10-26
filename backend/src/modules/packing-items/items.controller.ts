import type { PackingItemsService } from "./items.service.js";
import type { Request, Response } from "express";
import type { CreatePackingItemBody } from "./items.schema.js";

export class PackingItemsController {
    constructor(private readonly service: PackingItemsService) { }

    getAllByTripId = async (req: Request<{ tripId: string }>, res: Response) => {
        const items = await this.service.getAllByTripId(req.params.tripId);
        res.json(items);
    }

    create = async (req: Request<{ tripId: string }, {}, CreatePackingItemBody>, res: Response) => {
        const item = await this.service.create({ ...req.body, tripId: req.params.tripId });
        res.status(201).json('Packing item created! Packing item ID: ' + item.id);

    }
    delete = async (req: Request<{ id: string, tripId: string }>, res: Response) => {
        await this.service.delete(req.params.id, req.params.tripId);
        res.status(204).end();
    }
    update = async (req: Request<{ id: string, tripId: string }, {}, CreatePackingItemBody>, res: Response) => {
        await this.service.update(req.params.id, req.params.tripId, req.body);
        res.status(200).json('Packing item updated!');
    }
}