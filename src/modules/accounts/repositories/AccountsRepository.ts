import { Pool, RowDataPacket } from 'mysql2/promise';
import { inject, injectable } from 'tsyringe';

import { MariaDbConnection } from '../../../common/database/mariadb';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccount } from '../models/IAccount';
import { IAccountsRepository } from './IAccountsRepository';

interface IRowData extends Array<RowDataPacket> {
  affectedRows: number;
  insertId: number;
}

@injectable()
class AccountsRepository implements IAccountsRepository {
  private connection: Pool;

  constructor(
    @inject('MariaDbConnection')
    databaseConnection: MariaDbConnection
  ) {
    this.connection = databaseConnection.get();
  }

  async create({
    idPessoa,
    limiteSaqueDiario,
    tipoConta,
  }: ICreateAccountDTO): Promise<number | null> {
    let response = null;

    try {
      const [rows] = await this.connection.query<IRowData>(`
      INSERT INTO contas (idPessoa, limiteSaqueDiario, tipoConta)
      VALUES (${idPessoa}, ${limiteSaqueDiario}, ${tipoConta});
    `);

      response = rows.insertId;
    } catch (_e: unknown) {
      const err = _e as Error;
      console.log('Something went wrong', { error: err.message });
    }

    return response;
  }

  async findById(accountId: number): Promise<IAccount | null> {
    const [rows] = await this.connection.query<IAccount[]>(`
      SELECT * FROM contas
      WHERE id = ${accountId}
    `);

    if (rows.length !== 0) {
      return rows[0];
    }

    return null;
  }

  async updateBalance(accountId: number, newBalance: number): Promise<number | null> {
    let response = null;

    try {
      const [rows] = await this.connection.query<IRowData>(`
      UPDATE contas
        SET saldo = ${newBalance}
      WHERE id = ${accountId};
    `);

      response = rows.affectedRows;
    } catch (_e: unknown) {
      const err = _e as Error;
      console.log('Something went wrong', { error: err.message });
    }

    return response;
  }

  async blockAccount(accountId: number): Promise<number | null> {
    let response = null;

    try {
      const [rows] = await this.connection.query<IRowData>(`
      UPDATE contas
        SET flagAtivo = false
      WHERE id = ${accountId}
    `);

      response = rows.affectedRows;
    } catch (_e: unknown) {
      const err = _e as Error;
      console.log('Something went wrong', { error: err.message });
    }

    return response;
  }
}

export { AccountsRepository };
