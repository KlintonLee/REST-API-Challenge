import { Router } from 'express';

import { customerRouter } from '../modules/customers/routes';
import { accountsRouter } from '../modules/accounts/routes';

const routes = Router();

routes.use('/customers', customerRouter);
routes.use('/accounts', accountsRouter);

export { routes };
