import { IAccountsRepository } from '../repositories/IAccountsRepository';

class ShowBalanceService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async execute(accountId: number): Promise<number | null> {
    const accountExists = await this.accountsRepository.findById(accountId);

    if (!accountExists) {
      return null;
    }

    return accountExists.saldo;
  }
}

export { ShowBalanceService };
