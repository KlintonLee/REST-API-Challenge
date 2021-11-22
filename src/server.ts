/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import './common/container';
import config from './common/config';
import { routes } from './routes';
import { ExceptionHandler } from './common/ExceptionHandler';
import { Logger } from './common/Logger';

const app = express();
const { port, name, nodeEnv } = config.app;
const logger = Logger.getInstance().get();

app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof ExceptionHandler) {
    logger.error(
      'src/modules/customers/controllers/CustomersController.ts - method create - Something went wrong',
      { error: err.message }
    );

    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }

  logger.error('server.js - Unexpected server error occured', { error: err });
  return response.status(500).json({
    status: 'error',
    error: 'Internal Server Error',
  });
});

app.listen(port, () => {
  logger.info(`server.js - ${name} is running at port ${port} as ${nodeEnv} environment`);
});
