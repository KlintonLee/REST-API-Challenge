import { Request, Response } from 'express';
import { format } from 'date-fns';
import { container } from 'tsyringe';

import { CustomersRepository } from '../repositories/CustomersRepository';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { FindCustomerByIdService } from '../services/FindCustomerByIdService';
import { ExceptionHandler } from '../../../common/ExceptionHandler';

class CustomersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { nome, cpf, dataNascimento } = request.body;

    try {
      const customersRepository = container.resolve(CustomersRepository);
      const createCustomerService = new CreateCustomerService(customersRepository);

      const formatToDate = format(new Date(dataNascimento), 'yyyy-MM-dd HH:mm:ss');
      await createCustomerService.execute({
        nome,
        cpf,
        dataNascimento: formatToDate,
      });

      return response.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (_e) {
      const err = _e as ExceptionHandler;
      console.log(err);

      return response.status(err.statusCode).json({ message: err.message });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { customerId } = request.params;

    try {
      const customersRepository = container.resolve(CustomersRepository);
      const findCustomerById = new FindCustomerByIdService(customersRepository);

      const customer = await findCustomerById.execute(Number(customerId));

      return response.status(200).json(customer);
    } catch (_e) {
      const err = _e as ExceptionHandler;

      return response.status(err.statusCode).json({ message: err.message });
    }
  }
}

export { CustomersController };
