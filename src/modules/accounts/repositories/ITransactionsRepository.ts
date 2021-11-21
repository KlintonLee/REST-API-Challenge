import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';
import { ITransaction } from '../models/ITransaction';

interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<void>;
  statement(transactionId: number, initialDate: string, finalData: string): Promise<ITransaction[]>;
}

export { ITransactionsRepository };
