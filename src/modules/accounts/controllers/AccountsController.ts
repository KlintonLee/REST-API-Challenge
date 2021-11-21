import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CustomersRepository } from '../../customers/repositories/CustomersRepository';
import { AccountsRepository } from '../repositories/AccountsRepository';
import { CreateAccountService } from '../services/CreateAccountService';

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
}

export { AccountsController };
