import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { CustomersRepository } from '../../customers/repositories/CustomersRepository';
import { AccountsRepository } from '../repositories/AccountsRepository';
import { TransactionsRepository } from '../repositories/TransactionsRepository';
import { BlockAccountService } from '../services/BlockAccountService';
import { CreateAccountService } from '../services/CreateAccountService';
import { DepositValueService } from '../services/DepositValueService';
import { ShowBalanceService } from '../services/ShowBalanceService';
import { WithdrawalService } from '../services/WithdrawalService';

class AccountsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { idPessoa, tipoConta, limiteSaqueDiario } = request.body;

    try {
      const customersRepository = container.resolve(CustomersRepository);
      const accountsRepository = container.resolve(AccountsRepository);
      const createAccountService = new CreateAccountService(
        customersRepository,
        accountsRepository
      );

      await createAccountService.execute({
        idPessoa: Number(idPessoa),
        limiteSaqueDiario: Number(limiteSaqueDiario),
        tipoConta,
      });

      return response.json({ messag: 'Conta criada com sucesso' });
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async deposit(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { valor } = request.body;

    try {
      const accountsRepository = container.resolve(AccountsRepository);
      const transactionsRepository = container.resolve(TransactionsRepository);
      const depositValueService = new DepositValueService(
        accountsRepository,
        transactionsRepository
      );

      await depositValueService.execute(Number(accountId), Number(valor));

      return response.json({ message: `Depósito de ${valor} efetuado com sucesso` });
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async showBalance(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;

    try {
      const accountsRepository = container.resolve(AccountsRepository);
      const showBalanceService = new ShowBalanceService(accountsRepository);

      const balance = await showBalanceService.execute(Number(accountId));

      return response.json({ message: `Saldo disponível: ${balance}` });
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async withdrawal(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { valor } = request.body;

    try {
      const accountsRepository = container.resolve(AccountsRepository);
      const transactionsRepository = container.resolve(TransactionsRepository);
      const withdrawalService = new WithdrawalService(accountsRepository, transactionsRepository);

      await withdrawalService.execute(Number(accountId), Number(valor));

      return response.json({ message: `Saque de ${valor} efetuado com sucesso` });
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async blockAccount(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;

    try {
      const accountsRepository = container.resolve(AccountsRepository);
      const blockAccountService = new BlockAccountService(accountsRepository);

      await blockAccountService.execute(Number(accountId));

      return response.json({ message: 'Conta bloqueada com sucesso' });
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }
}

export { AccountsController };
