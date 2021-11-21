import { IAccountsRepository } from '../repositories/IAccountsRepository';

class BlockAccountService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async execute(accountId: number): Promise<void> {
    await this.accountsRepository.blockAccount(accountId);
  }
}

export { BlockAccountService };
