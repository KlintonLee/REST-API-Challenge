import { ICreateCustomerDTO } from '../../../../src/modules/customers/dtos/ICreateCustomerDTO';
import { ICustomer } from '../../../../src/modules/customers/models/ICustomer';
import { ICustomersRepository } from '../../../../src/modules/customers/repositories/ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  public customers: Array<ICustomer> = [];

  async create({ nome, cpf, dataNascimento }: ICreateCustomerDTO): Promise<number | null> {
    const cpfExists = this.customers.find(findCustomer => findCustomer.cpf === cpf);

    if (cpfExists) {
      return null;
    }

    const customer: ICustomer = {
      id: 1,
      nome,
      cpf,
      dataNascimento,
    };

    this.customers.push(customer);

    return customer.id;
  }

  async findCustomerById(customerId: number): Promise<ICustomer | null> {
    const customer = this.customers.find(findCustomer => findCustomer.id === customerId);

    if (customer) {
      return customer;
    }

    return null;
  }
}

export { FakeCustomersRepository };
