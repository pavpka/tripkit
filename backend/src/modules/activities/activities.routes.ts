import { Router } from "express";
import { validateBody } from "../../middlewares/validate-body.js";
import { createActivitySchema } from "./activities.schema.js";
import { ActivitiesController } from "./activities.controller.js";
import { ActivitiesService } from "./activities.service.js";
import { PostgresActivitiesRepository } from "./activities.repository.js";


const controller = new ActivitiesController(new ActivitiesService(new PostgresActivitiesRepository()));
export const activitiesRouter = Router({ mergeParams: true });

activitiesRouter.get('/', controller.getAllByTripId);
activitiesRouter.post('/', validateBody(createActivitySchema), controller.create);
activitiesRouter.delete('/:id', controller.delete);
activitiesRouter.put('/:id', validateBody(createActivitySchema), controller.update);