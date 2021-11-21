import { IAccountsRepository } from '../repositories/IAccountsRepository';

class WithdrawalService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async execute(accountId: number, value: number): Promise<number | null> {
    const accountExists = await this.accountsRepository.findById(accountId);
    if (!accountExists) {
      return null;
    }

    const newBalance = Number(accountExists.saldo) - value;
    if (newBalance < 0) {
      return null;
    }

    await this.accountsRepository.updateBalance(accountId, newBalance);
    return newBalance;
  }
}

export { WithdrawalService };
