import { Pool, RowDataPacket } from 'mysql2/promise';
import { inject, injectable } from 'tsyringe';

import { MariaDbConnection } from '../../../common/database/mariadb';
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { ICustomer } from '../models/ICustomer';
import { ICustomersRepository } from './ICustomersRepository';

interface IInsertId extends Array<RowDataPacket> {
  insertId: number;
}

@injectable()
class CustomersRepository implements ICustomersRepository {
  private connection: Pool;

  constructor(
    @inject('MariaDbConnection')
    databaseConnection: MariaDbConnection
  ) {
    this.connection = databaseConnection.get();
  }

  async create({ nome, cpf, dataNascimento }: ICreateCustomerDTO): Promise<number | null> {
    let response = null;

    try {
      const [rows] = await this.connection.query<IInsertId>(`
        INSERT INTO pessoas (nome, cpf, dataNascimento)
        VALUES ('${nome}', '${cpf}', '${dataNascimento}');
      `);

      response = rows.insertId;
    } catch (_e: unknown) {
      const err = _e as Error;
      console.log('Something went wrong', { error: err.message });
    }

    return response;
  }

  async findCustomerById(customerId: number): Promise<ICustomer | null> {
    const [rows] = await this.connection.query<ICustomer[]>(`
      SELECT * FROM pessoas
      WHERE id = ${customerId};
    `);

    if (rows.length !== 0) {
      return rows[0];
    }

    return null;
  }
}

export { CustomersRepository };
