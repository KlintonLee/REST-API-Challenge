import dotenv from 'dotenv';

dotenv.config();
const config = {
  app: {
    name: process.env.APP_NAME || 'REST-API-Challenge',
    nodeEnv: process.env.NODE_ENV || 'develop',
    port: process.env.APP_PORT || 3333,
    errorLogPathFile: process.env.ERROR_LOG_PATH_FILE || 'logs/error.log',
    combinedLogPathFile: process.env.COMBINED_LOG_PATH_FILE || 'logs/combined.log',
  },
  database: {
    mysql: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || 'finances',
      waitForConnections: true,
      multipleStatements: true,
      connectionLimit: 100,
    },
  },
};

export default config;
