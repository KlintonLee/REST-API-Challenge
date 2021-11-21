import { Router } from 'express';
import { AccountsController } from '../controllers/AccountsController';

const accountsController = new AccountsController();

const accountsRouter = Router();

accountsRouter.post('/', accountsController.create);

export { accountsRouter };
