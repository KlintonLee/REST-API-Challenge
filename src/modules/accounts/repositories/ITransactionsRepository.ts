import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';
import { ITransaction } from '../models/ITransaction';

interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<number | null>;
  statement(accountId: number, initialDate: string, finalData: string): Promise<ITransaction[]>;
}

export { ITransactionsRepository };
