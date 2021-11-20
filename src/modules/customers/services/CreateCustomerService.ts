/* eslint-disable no-empty-function */
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(createCustomerData: ICreateCustomerDTO): Promise<void> {
    await this.customersRepository.create(createCustomerData);
  }
}

export { CreateCustomerService };
