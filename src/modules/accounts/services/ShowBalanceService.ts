import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

class ShowBalanceService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async execute(accountId: number): Promise<number | null> {
    const accountExists = await this.accountsRepository.findById(accountId);

    if (!accountExists) {
      throw new ExceptionHandler('Conta não existe,entre em contato com o seu gerente', 400);
    }

    const { saldo } = accountExists;
    return saldo;
  }
}

export { ShowBalanceService };
