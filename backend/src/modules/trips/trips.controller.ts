import type { Request, Response } from 'express';
import type { TripsService } from './trips.service.js';
import type { CreateTripDto } from './trips.types.js';

export class TripsController {
    constructor(private readonly service: TripsService) { }
    getAll = async (_req: Request, res: Response) => {
        const trips = await this.service.getAll();
        res.json(trips);
    };
    getById = async (req: Request<{ id: string }>, res: Response) => {
        const trip = await this.service.getById(req.params.id);
        res.json(trip);
    };
    create = async (req: Request<{}, {}, CreateTripDto>, res: Response) => {
        const trip = await this.service.create(req.body);
        res.status(201).json('Trip created! Trip ID: ' + trip.id);
    };
    delete = async (req: Request<{ id: string }>, res: Response) => {
        await this.service.delete(req.params.id);
        res.status(204).end();
    };
    update = async (req: Request<{ id: string }>, res: Response) => {
        await this.service.update(req.params.id, req.body);
        res.status(200).json('Trip updated!');
    };
}


/*
Тонкий слой, который:

достаёт данные из запроса (req.params.id, req.body, req.query);
вызывает нужный метод сервиса;
отправляет ответ с правильным статусом (res.json(...), res.status(201)...).
Бизнес-логики в контроллере быть не должно. Если в нём появляются if про даты или статусы, 
это повод перенести код в сервис.
*/