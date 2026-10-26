import { Router } from "express";
import { DaysController } from "./days.controller.js";
import { DaysService } from "./days.service.js";
import { PostgresDaysRepository } from "./days.repository.js";
import { validateBody } from "../../middlewares/validate-body.js";
import { createDaySchema } from "./days.schema.js";

const controller = new DaysController(new DaysService(new PostgresDaysRepository()));
export const daysRouter = Router({ mergeParams: true });

daysRouter.get('/', controller.getAllByTripId);
daysRouter.post('/', validateBody(createDaySchema), controller.create);
daysRouter.delete('/:id', controller.delete);
daysRouter.put('/:id', validateBody(createDaySchema), controller.update);