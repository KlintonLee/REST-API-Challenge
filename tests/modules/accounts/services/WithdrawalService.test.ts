import { format } from 'date-fns';

import { ExceptionHandler } from '../../../../src/common/ExceptionHandler';
import { IAccount } from '../../../../src/modules/accounts/models/IAccount';
import { ITransaction } from '../../../../src/modules/accounts/models/ITransaction';
import { WithdrawalService } from '../../../../src/modules/accounts/services/WithdrawalService';
import { FakeAccountsRepository } from '../fakes/FakeAccountsRepository';
import { FakeTransactionsRepository } from '../fakes/FakeTransactionsRepository';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeAccountsRepository: FakeAccountsRepository;
let withdrawalService: WithdrawalService;

describe('WithdrawalService.test.ts', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeAccountsRepository = new FakeAccountsRepository();
    withdrawalService = new WithdrawalService(fakeAccountsRepository, fakeTransactionsRepository);
  });

  it(`Given a valid account id that contains saldo == 1576.0
      When call execute from WithdrawalService class with 100 as withdrawal
      Then saldo should be updated to 1476.0`, async () => {
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

    await withdrawalService.execute(1, 100);

    const updatedAccountValue = fakeAccountsRepository.accounts[0];
    expect(updatedAccountValue.saldo).toBe(1476.0);
  });

  it(`Given an account id that NOT exists in the database
      When call execute method from WithdrawalService class
      Then should throw and instance of ExceptionHandler`, async () => {
    await expect(withdrawalService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given a valid account that flagAtivo == false
      When call execute method from WithdrawalService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const accountMock: IAccount = {
      id: 1,
      idPessoa: 1,
      saldo: 1576.0,
      limiteSaqueDiario: 1000,
      flagAtivo: false,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts[0] = accountMock;

    await expect(withdrawalService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given a valid account that reached daily withdrawal limit
      When call execute method from WithdrawalService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const transactionsMock: Array<ITransaction> = [
      {
        id: 1,
        idConta: 1,
        valor: 1000.0,
        tipoTransacao: 'saque',
        dataTransacao: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      },
    ];

    fakeTransactionsRepository.transactions = transactionsMock;

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

    await expect(withdrawalService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given a valid account but it doesn't have enought balance to withdrawal
      When call execute method from WithdrawalService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const accountMock: IAccount = {
      id: 1,
      idPessoa: 1,
      saldo: 1.0,
      limiteSaqueDiario: 1000,
      flagAtivo: true,
      tipoConta: 1,
      dataCriacao: '2021-11-21 14:30:00',
    };
    fakeAccountsRepository.accounts[0] = accountMock;

    await expect(withdrawalService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given a valid account id to withdrawal some value
      When call execute method from WithdrawalService class and something
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

    await expect(withdrawalService.execute(1, 100)).rejects.toBeInstanceOf(ExceptionHandler);

    jest.restoreAllMocks();
  });
});
