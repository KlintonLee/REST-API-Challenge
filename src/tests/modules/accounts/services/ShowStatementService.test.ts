import { ITransaction } from '../../../../modules/accounts/models/ITransaction';
import { ShowStatementService } from '../../../../modules/accounts/services/ShowStatementService';
import { FakeTransactionsRepository } from '../fakes/FakeTransactionsRepository';

describe('ShowStatementService.test.ts', () => {
  it(`Given a valid account id that exists some transactions and date as '2021-11-01 00:00:00'
      When call execute from ShowStatementService class
      Then should return every object that matches account Id and date
        starting from '2021-11-01 00:00:00' until +30 days`, async () => {
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const showStatementService = new ShowStatementService(fakeTransactionsRepository);

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
        valor: 150.0,
        tipoTransacao: 'deposito',
        dataTransacao: '2021-11-21 14:30:00',
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
        idConta: 2,
        valor: 100.0,
        tipoTransacao: 'deposito',
        dataTransacao: '2021-11-21 14:30:00',
      },
    ];

    fakeTransactionsRepository.transactions = transactionsMock;

    const statements = await showStatementService.execute(1, '2021-11-01 00:00:00');

    const expected = [
      {
        id: 2,
        idConta: 1,
        valor: 150,
        tipoTransacao: 'deposito',
        dataTransacao: '2021-11-21 14:30:00',
      },
    ];

    expect(statements).toEqual(expected);
  });
});
