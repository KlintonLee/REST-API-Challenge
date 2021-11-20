import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { ICustomer } from '../models/ICustomer';

interface ICustomersRepository {
  create(createCustomerDTO: ICreateCustomerDTO): Promise<void>;
  findCustomerById(customerId: number): Promise<ICustomer | null>;
}

export { ICustomersRepository };
