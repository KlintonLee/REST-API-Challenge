import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CustomersRepository } from '../../customers/repositories/CustomersRepository';
import { AccountsRepository } from '../repositories/AccountsRepository';
import { BlockAccountService } from '../services/BlockAccountService';
import { CreateAccountService } from '../services/CreateAccountService';
import { DepositValueService } from '../services/DepositValueService';
import { ShowBalanceService } from '../services/ShowBalanceService';
import { WithdrawalService } from '../services/WithdrawalService';

class AccountsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { idPessoa, tipoConta, limiteSaqueDiario } = request.body;

    const customersRepository = container.resolve(CustomersRepository);
    const accountsRepository = container.resolve(AccountsRepository);
    const createAccountService = new CreateAccountService(customersRepository, accountsRepository);

    await createAccountService.execute({
      idPessoa: Number(idPessoa),
      limiteSaqueDiario: Number(limiteSaqueDiario),
      tipoConta,
    });

    return response.json({ ok: true });
  }

  async deposit(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { valor } = request.body;

    const accountsRepository = container.resolve(AccountsRepository);
    const depositValueService = new DepositValueService(accountsRepository);

    await depositValueService.execute(Number(accountId), Number(valor));

    return response.json({ ok: true });
  }

  async showBalance(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;

    const accountsRepository = container.resolve(AccountsRepository);
    const showBalanceService = new ShowBalanceService(accountsRepository);

    const balance = await showBalanceService.execute(Number(accountId));

    return response.json({ balance });
  }

  async withdrawal(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { valor } = request.body;

    const accountsRepository = container.resolve(AccountsRepository);
    const withdrawalService = new WithdrawalService(accountsRepository);

    const balance = await withdrawalService.execute(Number(accountId), Number(valor));

    return response.json({ balance });
  }

  async blockAccount(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;

    const accountsRepository = container.resolve(AccountsRepository);
    const blockAccountService = new BlockAccountService(accountsRepository);

    await blockAccountService.execute(Number(accountId));

    return response.json();
  }
}

export { AccountsController };
