import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { HttpException } from './exceptions/http.exception.js';
import { apiV1Router } from './routes/index.js';
import { healthRouter } from './routes/health.routes.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/', (_req, res) => {
  res.json({ name: 'vezirka-api', status: 'running' });
});

app.use('/health', healthRouter);
app.use('/api/v1', apiV1Router);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof HttpException ? error.statusCode : 500;

  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal server error' : error.message
  });
};

app.use(errorHandler);
