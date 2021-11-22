import { ICreateCustomerDTO } from '../../../../modules/customers/dtos/ICreateCustomerDTO';
import { ICustomer } from '../../../../modules/customers/models/ICustomer';
import { ICustomersRepository } from '../../../../modules/customers/repositories/ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  public customers: Array<ICustomer> = [];

  async create({ nome, cpf, dataNascimento }: ICreateCustomerDTO): Promise<number | null> {
    const cpfExists = this.customers.find(findCustomer => findCustomer.cpf === cpf);

    if (cpfExists) {
      return null;
    }

    const customer: ICustomer = {
      id: Math.floor(Math.random() * 10),
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
