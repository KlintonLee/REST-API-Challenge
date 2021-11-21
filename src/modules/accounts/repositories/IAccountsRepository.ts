import { RowDataPacket } from 'mysql2/promise';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';

interface IBalance extends Array<RowDataPacket> {
  balance: number;
}

interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<void>;
  deposit(accountId: number, value: number): Promise<void>;
  getBalance(accountId: number): Promise<number>;
  withdrawal(accountId: number, value: number): Promise<number>;
  blockAccount(accountId: number): Promise<void>;
}

export { IBalance, IAccountsRepository };
