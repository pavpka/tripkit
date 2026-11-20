import express from 'express';
import { routes } from './routes.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { env } from './config/env.js';

export const app = express();
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);
