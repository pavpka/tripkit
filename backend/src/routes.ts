import { Router } from 'express';
import { tripsRouter } from './modules/trips/trips.routes.js';
import { packingItemsRoutes } from './modules/packing-items/items.routes.js';
import { daysRouter } from './modules/days/days.routes.js';
import { activitiesRouter } from './modules/activities/activities.routes.js';
/*
import { daysRouter } from './modules/days/days.routes.js';
import { activitiesRouter } from './modules/activities/activities.routes.js';
import { expensesRouter } from './modules/expenses/expenses.routes.js';
*/
export const routes = Router();

routes.use('/trips', tripsRouter);
routes.use('/trips/:tripId/packing-items', packingItemsRoutes);
routes.use('/trips/:tripId/days', daysRouter);
routes.use('/trips/:tripId/activities', activitiesRouter);
/*
     // ?dayId=... для фильтра по дню
routes.use('/trips/:tripId/expenses', expensesRouter);

*/