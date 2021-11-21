/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import './common/container';
import config from './common/config';
import { routes } from './routes';
import { ExceptionHandler } from './common/ExceptionHandler';

const app = express();
const { port, name, nodeEnv } = config.app;

app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ExceptionHandler) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    error: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`${name} is running at port ${port} as ${nodeEnv} environment`);
});
