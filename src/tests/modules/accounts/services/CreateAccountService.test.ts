import { ExceptionHandler } from '../../../../common/ExceptionHandler';
import { CreateAccountService } from '../../../../modules/accounts/services/CreateAccountService';
import { FakeCustomersRepository } from '../../customers/fakes/FakeCustomersRepository';
import { FakeAccountsRepository } from '../fakes/FakeAccountsRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let fakeAccountsRepository: FakeAccountsRepository;
let createAccountService: CreateAccountService;

describe('CreateAccountService.test.ts', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeAccountsRepository = new FakeAccountsRepository();
    createAccountService = new CreateAccountService(
      fakeCustomersRepository,
      fakeAccountsRepository
    );
  });

  it(`Given params as { idPessoa: 1, limiteSaqueDiario: 1000, tipoConta: 1 }
      When call execute method with those params from CreateAccountService class
      Then should return and integer as user ID`, async () => {
    const customerMock = {
      id: 1,
      nome: 'John Doe',
      cpf: '12345678900',
      dataNascimento: '2021-11-21',
    };
    fakeCustomersRepository.customers.push(customerMock);

    const insertedId = await createAccountService.execute({
      idPessoa: 1,
      limiteSaqueDiario: 1000,
      tipoConta: 1,
    });

    expect(insertedId).toBeGreaterThanOrEqual(0);
  });

  it(`Given a try to create an account from an non existing customer
      When call execute method with those params from CreateAccountService class
      Then should throw and instance of ExceptionHandler`, async () => {
    await expect(
      createAccountService.execute({
        idPessoa: 1,
        limiteSaqueDiario: 1000,
        tipoConta: 1,
      })
    ).rejects.toBeInstanceOf(ExceptionHandler);
  });

  it(`Given a try to create an account
      When call execute method from BlockAccountService class and something
        went wrong on insert that account
      Then should throw and instance of ExceptionHandler`, async () => {
    const customerMock = {
      id: 1,
      nome: 'John Doe',
      cpf: '12345678900',
      dataNascimento: '2021-11-21',
    };
    fakeCustomersRepository.customers.push(customerMock);

    jest.spyOn(fakeAccountsRepository, 'create').mockImplementation(async () => null);

    await expect(
      createAccountService.execute({
        idPessoa: 1,
        limiteSaqueDiario: 1000,
        tipoConta: 1,
      })
    ).rejects.toBeInstanceOf(ExceptionHandler);

    jest.restoreAllMocks();
  });
});
