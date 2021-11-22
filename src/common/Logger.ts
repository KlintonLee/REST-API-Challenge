/* eslint-disable no-use-before-define */
import { createLogger, transports, format } from 'winston';

import config from './config';

class Logger {
  private static instance: Logger;

  private logger;

  private constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: 'rubrik-report-analysis' },
      transports: [
        new transports.File({
          filename: config.app.errorLogPathFile,
          level: 'error',
        }),
        new transports.File({
          filename: config.app.combinedLogPathFile,
        }),
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public get() {
    return this.logger;
  }
}

export { Logger };
