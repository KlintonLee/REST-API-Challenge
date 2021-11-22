import { Pool, RowDataPacket } from 'mysql2/promise';
import { inject, injectable } from 'tsyringe';

import { MariaDbConnection } from '../../../common/database/mariadb';
import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';
import { ITransaction } from '../models/ITransaction';
import { ITransactionsRepository } from './ITransactionsRepository';

interface IRowData extends Array<RowDataPacket> {
  affectedRows: number;
  insertId: number;
}

interface ITransactionRowData extends ITransaction, RowDataPacket {}

@injectable()
class TransactionsRepository implements ITransactionsRepository {
  private connection: Pool;

  constructor(
    @inject('MariaDbConnection')
    databaseConnection: MariaDbConnection
  ) {
    this.connection = databaseConnection.get();
  }

  async create({
    idConta,
    valor,
    tipoTransacao,
    dataTransacao,
  }: ICreateTransactionDTO): Promise<number | null> {
    let response = null;

    try {
      const [rows] = await this.connection.query<IRowData>(`
      INSERT INTO transacoes (idConta, valor, tipoTransacao, dataTransacao)
      VALUES (${idConta}, ${valor}, '${tipoTransacao}', '${dataTransacao}')
    `);

      response = rows.insertId;
    } catch (_e: unknown) {
      const err = _e as Error;
      console.log('Something went wrong', { error: err.message });
    }

    return response;
  }

  async statement(
    accountId: number,
    initialDate: string,
    finalDate: string
  ): Promise<ITransaction[]> {
    const [rows] = await this.connection.query<ITransactionRowData[]>(`
      SELECT * FROM transacoes
      WHERE
        idConta = ${accountId} AND
        dataTransacao BETWEEN '${initialDate}' AND '${finalDate}';
    `);

    return rows;
  }
}

export { TransactionsRepository };
