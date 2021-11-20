import mysql, { Pool } from 'mysql2/promise';

export type IMariaDbConfig = {
  connectionLimit: number;
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
  waitForConnections: boolean;
  multipleStatements: boolean;
};

class MariaDbConnection {
  private connection: Pool;

  constructor(config: IMariaDbConfig) {
    this.connection = mysql.createPool(config);
  }

  get(): Pool {
    return this.connection;
  }
}

export { MariaDbConnection };
