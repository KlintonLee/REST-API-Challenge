import { Pool } from 'mysql2/promise';
import { inject, injectable } from 'tsyringe';
import { MariaDbConnection } from '../../../common/database/mariadb';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccount } from '../models/IAccount';
import { IAccountsRepository, IBalance } from './IAccountsRepository';

@injectable()
class AccountsRepository implements IAccountsRepository {
  private connection: Pool;

  constructor(
    @inject('MariaDbConnection')
    databaseConnection: MariaDbConnection
  ) {
    this.connection = databaseConnection.get();
  }

  async create({ idPessoa, limiteSaqueDiario, tipoConta }: ICreateAccountDTO): Promise<void> {
    await this.connection.query(`
      INSERT INTO contas (idPessoa, limiteSaqueDiario, tipoConta)
      VALUES (${idPessoa}, ${limiteSaqueDiario}, ${tipoConta});
    `);
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

  async updateBalance(accountId: number, newBalance: number): Promise<void> {
    await this.connection.query(`
      UPDATE contas
        SET saldo = ${newBalance}
      WHERE id = ${accountId};
    `);
  }

  async getBalance(accountId: number): Promise<number> {
    const [rows] = await this.connection.query<IBalance>(`
      SELECT saldo
      FROM contas
      WHERE id = ${accountId};
    `);

    const { saldo } = rows[0];

    return saldo;
  }

  async blockAccount(accountId: number): Promise<void> {
    await this.connection.query(`
      UPDATE contas
        SET flagAtivo = false
      WHERE id = ${accountId}
    `);
  }
}

export { AccountsRepository };
