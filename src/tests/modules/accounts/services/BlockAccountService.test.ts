import { ExceptionHandler } from '../../../../common/ExceptionHandler';
import { BlockAccountService } from '../../../../modules/accounts/services/BlockAccountService';
import { FakeAccountsRepository } from '../fakes/FakeAccountsRepository';

describe('BlockAccountService.test.ts', () => {
  it(`Given a valid account id that exists in the database with flagAtivo == true
      When call execute method from BlockAccountService class
      Then this account should be updated with flagAtivo to false`, async () => {
    const fakeAccountsRepository = new FakeAccountsRepository();
    const blockAccountService = new BlockAccountService(fakeAccountsRepository);

    const accountMock = {
      id: 1,
      idPessoa: 1,
      saldo: 0,
      limiteSaqueDiario: 1000,
      flagAtivo: true,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts[0] = accountMock;

    await blockAccountService.execute(1);

    const updatedAccount = fakeAccountsRepository.accounts[0];
    expect(updatedAccount.flagAtivo).toBeFalsy();
  });

  it(`Given an non existing account ID to be blocked
      When call execute method from BlockAccountService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const fakeAccountsRepository = new FakeAccountsRepository();
    const blockAccountService = new BlockAccountService(fakeAccountsRepository);

    await expect(blockAccountService.execute(1)).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given an existing account ID to be blocked
      When call execute method from BlockAccountService class and something
        went wrong on update
      Then should throw and instance of ExceptionHandler`, async () => {
    const fakeAccountsRepository = new FakeAccountsRepository();
    const blockAccountService = new BlockAccountService(fakeAccountsRepository);

    const accountMock = {
      id: 1,
      idPessoa: 1,
      saldo: 0,
      limiteSaqueDiario: 1000,
      flagAtivo: true,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts[0] = accountMock;

    jest.spyOn(fakeAccountsRepository, 'blockAccount').mockImplementation(async () => null);

    await expect(blockAccountService.execute(1)).rejects.toBeInstanceOf(ExceptionHandler);

    jest.restoreAllMocks();
  });
});
