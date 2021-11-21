import { Pool } from 'mysql2/promise';
import { inject, injectable } from 'tsyringe';
import { MariaDbConnection } from '../../../common/database/mariadb';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
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

  async deposit(accountId: number, value: number): Promise<void> {
    await this.connection.query(`
      UPDATE contas
        SET saldo = saldo + ${value}
      WHERE id = ${accountId};
    `);
  }

  async getBalance(accountId: number): Promise<number> {
    const [rows] = await this.connection.query<IBalance>(`
      SELECT saldo
      FROM contas
      WHERE id = ${accountId};
    `);

    const { balance } = rows;

    return balance;
  }

  async withdrawal(accountId: number, value: number): Promise<number> {
    const balance = await this.getBalance(accountId);

    if (balance >= value) {
      await this.connection.query(`
        UPDATE contas
          SET saldo = saldo - ${value}
        WHERE id = ${accountId};
      `);

      return value;
    }

    return 0;
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
