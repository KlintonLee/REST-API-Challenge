/* eslint-disable no-empty-function */
import { ExceptionHandler } from '../../../common/ExceptionHandler';
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
      throw new ExceptionHandler('Conta não existe,entre em contato com o seu gerente');
    }

    const insertedId = await this.accountsRepository.create({
      idPessoa,
      limiteSaqueDiario,
      tipoConta,
    });

    if (!insertedId) {
      throw new ExceptionHandler('Ocorreu um erro ao tentar criar a conta do usuário');
    }
  }
}

export { CreateAccountService };
