import { Router } from 'express';
import { AccountsController } from '../controllers/AccountsController';
import { TransactionsController } from '../controllers/TransactionsController';

const accountsController = new AccountsController();

const transactionsController = new TransactionsController();

const accountsRouter = Router();

accountsRouter.post('/', accountsController.create);
accountsRouter.get('/:accountId/balance', accountsController.showBalance);
accountsRouter.patch('/:accountId/deposit', accountsController.deposit);
accountsRouter.patch('/:accountId/withdrawal', accountsController.withdrawal);
accountsRouter.patch('/:accountId/block', accountsController.blockAccount);
accountsRouter.get('/:accountId/statements', transactionsController.showStatement);

export { accountsRouter };
