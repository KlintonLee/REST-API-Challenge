import { DailyWithdrawalLimitReached } from '../../../../src/modules/accounts/business/DailyWithdrawalLimitReached';
import { ITransaction } from '../../../../src/modules/accounts/models/ITransaction';

describe('DailyWithdrawalLimitReached.test.ts', () => {
  const transactionsMock: Array<ITransaction> = [
    {
      id: 1,
      idConta: 1,
      valor: 100.0,
      tipoTransacao: 'deposito',
      dataTransacao: '2021-01-21 14:30:00',
    },
    {
      id: 2,
      idConta: 1,
      valor: 550.0,
      tipoTransacao: 'saque',
      dataTransacao: '2021-01-21 14:30:00',
    },
    {
      id: 3,
      idConta: 1,
      valor: 150.0,
      tipoTransacao: 'saque',
      dataTransacao: '2021-01-21 14:30:00',
    },
    {
      id: 4,
      idConta: 1,
      valor: 100.0,
      tipoTransacao: 'deposito',
      dataTransacao: '2021-01-21 14:30:00',
    },
  ];

  it(`Given an list of transactions containing 700.0 as total withdrawal made
        daily limit withdrawal as 1000.00 and value to withdrawal as 100.00
      When call execute from DailyWithdrawalLimitReached class
      Then should return false`, () => {
    const dailyWithdrawalLimitReached = new DailyWithdrawalLimitReached(
      transactionsMock,
      1000,
      100
    );

    const result = dailyWithdrawalLimitReached.execute();

    expect(result).toBeFalsy();
  });

  it(`Given an list of transactions containing 700.00 as total withdrawal made
        daily limit withdrawal as 1000.00 and value to withdrawal as 500.00
      When call execute from DailyWithdrawalLimitReached class
      Then should return true`, () => {
    const dailyWithdrawalLimitReached = new DailyWithdrawalLimitReached(
      transactionsMock,
      1000,
      500
    );

    const result = dailyWithdrawalLimitReached.execute();

    expect(result).toBeTruthy();
  });
});
