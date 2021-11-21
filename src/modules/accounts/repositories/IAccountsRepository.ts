import { RowDataPacket } from 'mysql2/promise';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccount } from '../models/IAccount';

interface IBalance extends Array<RowDataPacket> {
  saldo: number;
}

interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<void>;
  findById(accountId: number): Promise<IAccount | null>;
  updateBalance(accountId: number, newBalance: number): Promise<void>;
  getBalance(accountId: number): Promise<number>;
  blockAccount(accountId: number): Promise<void>;
}

export { IBalance, IAccountsRepository };
