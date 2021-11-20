import dotenv from 'dotenv';

dotenv.config();
const config = {
  app: {
    name: process.env.APP_NAME || 'REST-API-Challenge',
    nodeEnv: process.env.NODE_ENV || 'develop',
    port: process.env.APP_PORT,
    errorLogPathFile: process.env.ERROR_LOG_PATH_FILE || 'logs/error.log',
    combinedLogPathFile: process.env.COMBINED_LOG_PATH_FILE || 'logs/combined.log',
  },
  database: {
    mysql: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      name: process.env.DB_NAME,
    },
  },
};

export default config;
