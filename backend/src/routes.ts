import { Router } from 'express';
import { tripsRouter } from './modules/trips/trips.routes.js';
import { packingItemsRoutes } from './modules/packing-items/items.routes.js';
import { daysRouter } from './modules/days/days.routes.js';
import { activitiesRouter } from './modules/activities/activities.routes.js';
import { expensesRouter } from './modules/expenses/expenses.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { requireAuth } from './modules/auth/auth.middleware.js';
import { requireTripOwner } from './modules/trips/trips.middleware.js';

export const routes = Router();

routes.use('/auth', authRouter);
routes.use('/trips', requireAuth, tripsRouter);

const tripScopedRouter = Router({ mergeParams: true });

tripScopedRouter.use('/packing-items', packingItemsRoutes);
tripScopedRouter.use('/days', daysRouter);
tripScopedRouter.use('/activities', activitiesRouter);
tripScopedRouter.use('/expenses', expensesRouter);

routes.use('/trips/:tripId', requireTripOwner, tripScopedRouter);