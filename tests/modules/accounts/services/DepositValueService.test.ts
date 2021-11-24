import { ExceptionHandler } from '../../../../src/common/ExceptionHandler';
import { IAccount } from '../../../../src/modules/accounts/models/IAccount';
import { DepositValueService } from '../../../../src/modules/accounts/services/DepositValueService';
import { FakeAccountsRepository } from '../fakes/FakeAccountsRepository';
import { FakeTransactionsRepository } from '../fakes/FakeTransactionsRepository';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeAccountsRepository: FakeAccountsRepository;
let depositValueService: DepositValueService;

describe('DepositValueService.test.ts', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeAccountsRepository = new FakeAccountsRepository();
    depositValueService = new DepositValueService(
      fakeAccountsRepository,
      fakeTransactionsRepository
    );
  });

  it(`Given a valid account id that contains saldo == 1576.0
      When call execute from DepositValueService class with 100 as deposit
      Then saldo should be updated to 1676.0`, async () => {
    const accountMock: IAccount = {
      id: 1,
      idPessoa: 1,
      saldo: 1576.0,
      limiteSaqueDiario: 1000,
      flagAtivo: true,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts[0] = accountMock;

    await depositValueService.execute(1, 100);

    const updatedAccountValue = fakeAccountsRepository.accounts[0];
    expect(updatedAccountValue.saldo).toBe(1676.0);
  });

  it(`Given an account id that NOT exists in the database
      When call execute method from DepositValueService class
      Then should throw and instance of ExceptionHandler`, async () => {
    await expect(depositValueService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given a valid account id to deposit some value
      When call execute method from DepositValueService class and something
        went wrong on update
      Then should throw and instance of ExceptionHandler`, async () => {
    const accountMock: IAccount = {
      id: 1,
      idPessoa: 1,
      saldo: 1576.0,
      limiteSaqueDiario: 1000,
      flagAtivo: true,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts[0] = accountMock;

    jest.spyOn(fakeAccountsRepository, 'updateBalance').mockImplementation(async () => null);

    await expect(depositValueService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);

    jest.restoreAllMocks();
  });
});
