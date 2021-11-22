import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { Logger } from '../../../common/Logger';
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
    const path = request.url;

    const logger = Logger.getInstance().get();
    logger.info(
      'src/modules/accounts/controllers/AccountsController.ts - method create - Starting to create a new account',
      { path, idPessoa, tipoConta, limiteSaqueDiario }
    );

    try {
      const customersRepository = container.resolve(CustomersRepository);
      const accountsRepository = container.resolve(AccountsRepository);
      const createAccountService = new CreateAccountService(
        customersRepository,
        accountsRepository
      );

      const insertedId = await createAccountService.execute({
        idPessoa: Number(idPessoa),
        limiteSaqueDiario: Number(limiteSaqueDiario),
        tipoConta,
      });

      return response.json({ messag: `Conta criada com sucesso, o ID da conta é ${insertedId}` });
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async deposit(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { valor } = request.body;
    const path = request.url;

    const logger = Logger.getInstance().get();
    logger.info(
      'src/modules/accounts/controllers/AccountsController.ts - method deposit - Making a deposit',
      { path, accountId, valor }
    );

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
    const path = request.url;

    const logger = Logger.getInstance().get();
    logger.info(
      'src/modules/accounts/controllers/AccountsController.ts - method showBalance - Getting balance by account ID',
      { path, accountId }
    );

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
    const path = request.url;

    const logger = Logger.getInstance().get();
    logger.info(
      'src/modules/accounts/controllers/AccountsController.ts - method withdrawal - Making a withdrawal',
      { path, accountId }
    );

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
    const path = request.url;

    const logger = Logger.getInstance().get();
    logger.info(
      'src/modules/accounts/controllers/AccountsController.ts - method blockAccount - Blocking an account by ID',
      { path, accountId }
    );

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
