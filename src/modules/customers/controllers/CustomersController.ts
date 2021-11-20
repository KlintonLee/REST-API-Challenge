import { Request, Response } from 'express';
import { format } from 'date-fns';
import { container } from 'tsyringe';
import { CustomersRepository } from '../repositories/CustomersRepository';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { FindCustomerByIdService } from '../services/FindCustomerByIdService';

class CustomersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { nome, cpf, dataNascimento } = request.body;

    const customersRepository = container.resolve(CustomersRepository);
    const createCustomerService = new CreateCustomerService(customersRepository);

    const formatToDate = format(new Date(dataNascimento), 'yyyy-MM-dd HH:mm:ss');
    await createCustomerService.execute({ nome, cpf, dataNascimento: formatToDate });

    return response.status(201).json({ message: 'ok' });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { customerId } = request.params;

    const customersRepository = container.resolve(CustomersRepository);
    const findCustomerById = new FindCustomerByIdService(customersRepository);

    const customer = await findCustomerById.execute(Number(customerId));

    return response.status(200).json(customer);
  }
}

export { CustomersController };
