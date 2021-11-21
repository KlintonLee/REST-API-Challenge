import { format } from 'date-fns';

import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { IAccountsRepository } from '../repositories/IAccountsRepository';
import { ITransactionsRepository } from '../repositories/ITransactionsRepository';

class DepositValueService {
  constructor(
    private accountsRepository: IAccountsRepository,
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(accountId: number, value: number): Promise<number> {
    const accountExists = await this.accountsRepository.findById(accountId);

    if (!accountExists) {
      throw new ExceptionHandler('Conta não existe, entre em contato com o seu gerente');
    }

    const newBalance = value + Number(accountExists.saldo);
    const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const affectedRows = await this.accountsRepository.updateBalance(accountId, newBalance);
    if (!affectedRows) {
      throw new ExceptionHandler(
        'Ocorreu um erro ao efetuar a ação de depósito, contate o seu gerente'
      );
    }

    await this.transactionsRepository.create({
      idConta: accountId,
      tipoTransacao: 'deposito',
      valor: value,
      dataTransacao: currentDate,
    });

    return newBalance;
  }
}

export { DepositValueService };
