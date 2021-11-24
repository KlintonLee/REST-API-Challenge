import { ICreateAccountDTO } from '../../../../src/modules/accounts/dtos/ICreateAccountDTO';
import { IAccount } from '../../../../src/modules/accounts/models/IAccount';
import { IAccountsRepository } from '../../../../src/modules/accounts/repositories/IAccountsRepository';

class FakeAccountsRepository implements IAccountsRepository {
  public accounts: Array<IAccount> = [];

  async create({
    idPessoa,
    tipoConta,
    limiteSaqueDiario,
  }: ICreateAccountDTO): Promise<number | null> {
    const account: IAccount = {
      id: 1,
      idPessoa,
      saldo: 0,
      limiteSaqueDiario,
      flagAtivo: true,
      tipoConta,
      dataCriacao: '2021-11-21 14:30:00',
    };

    this.accounts.push(account);

    return account.id;
  }

  async findById(accountId: number): Promise<IAccount | null> {
    const account = this.accounts.find(findAccount => findAccount.id === accountId);

    if (account) {
      return account;
    }

    return null;
  }

  async updateBalance(accountId: number, newBalance: number): Promise<number | null> {
    const findIndex = this.accounts.findIndex(account => account.id === accountId);

    this.accounts[findIndex].saldo = newBalance;

    return 1;
  }

  async blockAccount(accountId: number): Promise<number | null> {
    const findIndex = this.accounts.findIndex(account => account.id === accountId);

    this.accounts[findIndex].flagAtivo = false;

    return 1;
  }
}

export { FakeAccountsRepository };
