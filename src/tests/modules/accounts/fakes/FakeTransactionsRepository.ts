import { parseISO, isAfter, isBefore } from 'date-fns';

import { ICreateTransactionDTO } from '../../../../modules/accounts/dtos/ICreateTransactionDTO';
import { ITransaction } from '../../../../modules/accounts/models/ITransaction';
import { ITransactionsRepository } from '../../../../modules/accounts/repositories/ITransactionsRepository';

class FakeTransactionsRepository implements ITransactionsRepository {
  public transactions: Array<ITransaction> = [];

  async create({
    idConta,
    valor,
    tipoTransacao,
    dataTransacao,
  }: ICreateTransactionDTO): Promise<number> {
    const transaction: ITransaction = {
      id: 1,
      idConta,
      valor,
      tipoTransacao,
      dataTransacao,
    };

    this.transactions.push(transaction);

    return transaction.id;
  }

  async statement(
    accountId: number,
    initialDate: string,
    finalData: string
  ): Promise<ITransaction[]> {
    return this.transactions.filter(
      transaction =>
        transaction.idConta === accountId &&
        isAfter(parseISO(transaction.dataTransacao), parseISO(initialDate)) &&
        isBefore(parseISO(transaction.dataTransacao), parseISO(finalData))
    );
  }
}

export { FakeTransactionsRepository };
