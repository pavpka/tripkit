import { Router } from "express";
import { TripsService } from "./trips.service.js";
import { PostgresTripsRepository } from "./trips.repository.js";
import { TripsController } from "./trips.controller.js";
import { validateBody } from "../../middlewares/validate-body.js";
import { createTripSchema } from "./trips.schema.js";
import { PostgresDaysRepository } from "../days/days.repository.js";

const controller = new TripsController(new TripsService(new PostgresTripsRepository(new PostgresDaysRepository())));
export const tripsRouter = Router();

tripsRouter.get('/', controller.getAll);
tripsRouter.get('/:id', controller.getById);
tripsRouter.post('/', validateBody(createTripSchema), controller.create);
tripsRouter.delete('/:id', controller.delete);
tripsRouter.put('/:id', validateBody(createTripSchema), controller.update);