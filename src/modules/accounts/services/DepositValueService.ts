import { format } from 'date-fns';
import { IAccountsRepository } from '../repositories/IAccountsRepository';
import { ITransactionsRepository } from '../repositories/ITransactionsRepository';

class DepositValueService {
  constructor(
    private accountsRepository: IAccountsRepository,
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(accountId: number, value: number): Promise<void> {
    const accountExists = await this.accountsRepository.findById(accountId);

    if (!accountExists) {
      return;
    }

    const newBalance = value + Number(accountExists.saldo);
    const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    await this.accountsRepository.updateBalance(accountId, newBalance);
    await this.transactionsRepository.create({
      idConta: accountId,
      tipoTransacao: 'deposito',
      valor: value,
      dataTransacao: currentDate,
    });
  }
}

export { DepositValueService };
