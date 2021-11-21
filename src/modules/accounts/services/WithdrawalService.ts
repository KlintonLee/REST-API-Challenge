import { format } from 'date-fns';

import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { IAccountsRepository } from '../repositories/IAccountsRepository';
import { ITransactionsRepository } from '../repositories/ITransactionsRepository';

class WithdrawalService {
  constructor(
    private accountsRepository: IAccountsRepository,
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(accountId: number, value: number): Promise<void> {
    const accountExists = await this.accountsRepository.findById(accountId);
    if (!accountExists) {
      throw new ExceptionHandler('Conta não existe,entre em contato com o seu gerente', 400);
    }

    if (!accountExists.flagAtivo) {
      throw new ExceptionHandler('Conta bloqueada,entre em contato com o seu gerente', 400);
    }

    const newBalance = Number(accountExists.saldo) - value;
    if (newBalance < 0) {
      throw new ExceptionHandler('Saldo insuficiente para efetuarmos esta ação', 400);
    }

    const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const affectedRows = await this.accountsRepository.updateBalance(accountId, newBalance);
    if (!affectedRows) {
      throw new ExceptionHandler(
        'Ocorreu um erro ao efetuar a ação de saque, contate o seu gerente',
        400
      );
    }

    // Obs de melhoria: Ação compensatória em caso de falha, podemos dar um rollback de todas ações
    // executadas anteriormente.
    await this.transactionsRepository.create({
      idConta: accountId,
      tipoTransacao: 'saque',
      valor: value,
      dataTransacao: currentDate,
    });
  }
}

export { WithdrawalService };
