import { IAccountsRepository } from '../repositories/IAccountsRepository';

class DepositValueService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async execute(accountId: number, value: number): Promise<void> {
    const accountExists = await this.accountsRepository.findById(accountId);

    if (!accountExists) {
      return;
    }

    const newBalance = value + Number(accountExists.saldo);

    await this.accountsRepository.updateBalance(accountId, newBalance);
  }
}

export { DepositValueService };
