import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccount } from '../models/IAccount';

interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<number | null>;
  findById(accountId: number): Promise<IAccount | null>;
  updateBalance(accountId: number, newBalance: number): Promise<number | null>;
  blockAccount(accountId: number): Promise<number | null>;
}

export { IAccountsRepository };
