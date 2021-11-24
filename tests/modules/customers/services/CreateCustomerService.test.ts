import { ExceptionHandler } from '../../../../src/common/ExceptionHandler';
import { CreateCustomerService } from '../../../../src/modules/customers/services/CreateCustomerService';
import { FakeCustomersRepository } from '../fakes/FakeCustomersRepository';

describe('CreateCustomerService.test.ts', () => {
  it(`Given params as { nome: "John Doe", cpf: "12345678900", dataNascimento: "2021-11-21" }
      When call execute method with those params from CreateCustomerService class
      Then should return and integer as user ID`, async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(fakeCustomersRepository);

    const insertedId = await createCustomerService.execute({
      nome: 'John Doe',
      cpf: '12345678900',
      dataNascimento: '2021-11-21',
    });

    expect(insertedId).toBeGreaterThanOrEqual(0);
  });

  it(`Given params as { nome: "John Doe", cpf: "12345678900", dataNascimento: "2021-11-21" }
        but an user with this cpf has already been created
      When call execute method with those params from CreateCustomerService class
      Then should throw and instance of ExceptionHandler`, async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(fakeCustomersRepository);

    fakeCustomersRepository.customers.push({
      id: 1,
      nome: 'John Doe',
      cpf: '12345678900',
      dataNascimento: '2021-11-21',
    });

    await expect(
      createCustomerService.execute({
        nome: 'John Doe',
        cpf: '12345678900',
        dataNascimento: '2021-11-21',
      })
    ).rejects.toBeInstanceOf(ExceptionHandler);
  });
});
