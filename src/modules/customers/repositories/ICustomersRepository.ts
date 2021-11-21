import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { ICustomer } from '../models/ICustomer';

interface ICustomersRepository {
  create(createCustomerDTO: ICreateCustomerDTO): Promise<number | null>;
  findCustomerById(customerId: number): Promise<ICustomer | null>;
}

export { ICustomersRepository };
