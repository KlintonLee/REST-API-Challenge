import { format } from 'date-fns';
import { IAccountsRepository } from '../repositories/IAccountsRepository';
import { ITransactionsRepository } from '../repositories/ITransactionsRepository';

class WithdrawalService {
  constructor(
    private accountsRepository: IAccountsRepository,
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(accountId: number, value: number): Promise<number | null> {
    const accountExists = await this.accountsRepository.findById(accountId);
    if (!accountExists) {
      return null;
    }

    const newBalance = Number(accountExists.saldo) - value;
    if (newBalance < 0) {
      return null;
    }
    const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    await this.accountsRepository.updateBalance(accountId, newBalance);
    await this.transactionsRepository.create({
      idConta: accountId,
      tipoTransacao: 'saque',
      valor: value,
      dataTransacao: currentDate,
    });
    return newBalance;
  }
}

export { WithdrawalService };
