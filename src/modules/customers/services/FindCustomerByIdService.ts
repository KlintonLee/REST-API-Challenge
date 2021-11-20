import { ICustomer } from '../models/ICustomer';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

class FindCustomerByIdService {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(customerId: number): Promise<ICustomer | null> {
    const customer = await this.customersRepository.findCustomerById(customerId);

    return customer;
  }
}

export { FindCustomerByIdService };
