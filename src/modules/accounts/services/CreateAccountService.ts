/* eslint-disable no-empty-function */
import { ICustomersRepository } from '../../customers/repositories/ICustomersRepository';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

class CreateAccountService {
  constructor(
    private customersRepository: ICustomersRepository,
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({ idPessoa, limiteSaqueDiario, tipoConta }: ICreateAccountDTO): Promise<void> {
    const customerExists = await this.customersRepository.findCustomerById(idPessoa);

    if (!customerExists) {
      return;
    }

    await this.accountsRepository.create({ idPessoa, limiteSaqueDiario, tipoConta });
  }
}

export { CreateAccountService };
