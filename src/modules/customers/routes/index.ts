import { Router } from 'express';
import { CustomersController } from '../controllers/CustomersController';

const customerRouter = Router();
const customersController = new CustomersController();

customerRouter.post('/customer', customersController.create);
customerRouter.get('/customer/:customerId', customersController.show);

export { customerRouter };
