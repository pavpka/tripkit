import express from 'express';
import { routes } from './routes.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';
/*
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';
*/

export const app = express();
app.use(express.json());
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);





