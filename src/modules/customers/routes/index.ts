import { Router } from 'express';

import { CustomersController } from '../controllers/CustomersController';

const customerRouter = Router();
const customersController = new CustomersController();

customerRouter.post('/', customersController.create);
customerRouter.get('/:customerId', customersController.show);

export { customerRouter };
