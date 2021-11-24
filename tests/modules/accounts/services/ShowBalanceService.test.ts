import { ExceptionHandler } from '../../../../src/common/ExceptionHandler';
import { IAccount } from '../../../../src/modules/accounts/models/IAccount';
import { ShowBalanceService } from '../../../../src/modules/accounts/services/ShowBalanceService';
import { FakeAccountsRepository } from '../fakes/FakeAccountsRepository';

describe('ShowBalanceService.test.ts', () => {
  it(`Given a valid account id that exists in the database with saldo == 1576.0
      When call execute method from ShowBalanceService class
      Then should return 1576.0`, async () => {
    const fakeAccountsRepository = new FakeAccountsRepository();
    const showBalanceService = new ShowBalanceService(fakeAccountsRepository);

    const accountMock: IAccount = {
      id: 1,
      idPessoa: 1,
      saldo: 1576.0,
      limiteSaqueDiario: 1000,
      flagAtivo: true,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts.push(accountMock);

    const balance = await showBalanceService.execute(1);

    expect(balance).toBe(1576.0);
  });

  it(`Given an account id that NOT exists in the database
      When call execute method from ShowBalanceService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const fakeAccountsRepository = new FakeAccountsRepository();
    const showBalanceService = new ShowBalanceService(fakeAccountsRepository);

    await expect(showBalanceService.execute(1)).rejects.toBeInstanceOf(ExceptionHandler);
  });
});
