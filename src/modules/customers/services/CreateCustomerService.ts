/* eslint-disable no-empty-function */
import { ExceptionHandler } from '../../../common/ExceptionHandler';
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(createCustomerData: ICreateCustomerDTO): Promise<number> {
    const insertedId = await this.customersRepository.create(createCustomerData);

    if (!insertedId) {
      throw new ExceptionHandler('Ocorreu um erro ao tentar criar o usuário', 400);
    }

    return insertedId;
  }
}

export { CreateCustomerService };
