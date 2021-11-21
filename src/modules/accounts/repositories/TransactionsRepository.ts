import { Pool } from 'mysql2/promise';
import { inject, injectable } from 'tsyringe';

import { MariaDbConnection } from '../../../common/database/mariadb';
import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';
import { ITransaction } from '../models/ITransaction';
import { ITransactionsRepository } from './ITransactionsRepository';

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
  }: ICreateTransactionDTO): Promise<void> {
    await this.connection.query(`
      INSERT INTO transacoes (idConta, valor, tipoTransacao, dataTransacao)
      VALUES (${idConta}, ${valor}, '${tipoTransacao}', '${dataTransacao}')
    `);
  }

  async statement(
    accountId: number,
    initialDate: string,
    finalDate: string
  ): Promise<ITransaction[]> {
    const [rows] = await this.connection.query<ITransaction[]>(`
      SELECT * FROM transacoes
      WHERE
        idConta = ${accountId} AND
        dataTransacao BETWEEN '${initialDate}' AND '${finalDate}';
    `);

    return rows;
  }
}

export { TransactionsRepository };
