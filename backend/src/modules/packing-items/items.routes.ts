import { Router } from "express";
import { PackingItemsController } from "./items.controller.js";
import { PackingItemsService } from "./items.service.js";
import { PostgresPackingItemsRepository } from "./items.repository.js";
import { validateBody } from "../../middlewares/validate-body.js";
import { createPackingItemSchema } from "./items.schema.js";

const controller = new PackingItemsController(new PackingItemsService(new PostgresPackingItemsRepository()));
export const packingItemsRoutes = Router({ mergeParams: true });

packingItemsRoutes.get('/', controller.getAllByTripId);
packingItemsRoutes.post('/', validateBody(createPackingItemSchema), controller.create);
packingItemsRoutes.delete('/:id', controller.delete);
packingItemsRoutes.put('/:id', validateBody(createPackingItemSchema), controller.update);