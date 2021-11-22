import { ExceptionHandler } from '../../../../common/ExceptionHandler';
import { FindCustomerByIdService } from '../../../../modules/customers/services/FindCustomerByIdService';
import { FakeCustomersRepository } from '../fakes/FakeCustomersRepository';

describe('FindCustomerByIdService.test.ts', () => {
  it(`Given a valid customer id that exists in the database
      When call execute method from FindCustomerByIdService class
      Then should return that customer`, async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const findCustomerByIdService = new FindCustomerByIdService(fakeCustomersRepository);

    const customerMock = {
      id: 1,
      nome: 'John Doe',
      cpf: '12345678900',
      dataNascimento: '2021-11-21',
    };

    fakeCustomersRepository.customers.push(customerMock);

    const customer = await findCustomerByIdService.execute(1);

    expect(customer).toBe(customerMock);
  });

  it(`Given a valid customer id that NOT exists in the database
      When call execute method from FindCustomerByIdService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const findCustomerByIdService = new FindCustomerByIdService(fakeCustomersRepository);

    await expect(findCustomerByIdService.execute(1)).rejects.toBeInstanceOf(ExceptionHandler);
  });
});
