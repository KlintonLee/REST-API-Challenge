import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

class BlockAccountService {
  constructor(private accountsRepository: IAccountsRepository) {}

  async execute(accountId: number): Promise<void> {
    const accountExists = await this.accountsRepository.findById(accountId);

    if (!accountExists) {
      throw new ExceptionHandler('Conta não existe, entre em contato com o seu gerente', 400);
    }

    const affectedRows = await this.accountsRepository.blockAccount(accountId);

    if (!affectedRows) {
      throw new ExceptionHandler(
        'Ocorreu um erro na tentativa de bloquear sua conta, contate seu gerente'
      );
    }
  }
}

export { BlockAccountService };
