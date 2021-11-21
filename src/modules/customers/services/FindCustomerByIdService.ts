import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { ICustomer } from '../models/ICustomer';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

class FindCustomerByIdService {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(customerId: number): Promise<ICustomer | null> {
    const customer = await this.customersRepository.findCustomerById(customerId);

    if (!customer) {
      throw new ExceptionHandler('Cliente não localizado', 400);
    }

    return customer;
  }
}

export { FindCustomerByIdService };
