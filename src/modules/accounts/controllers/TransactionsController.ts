import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Logger } from '../../../common/Logger';
import { TransactionsRepository } from '../repositories/TransactionsRepository';
import { ShowStatementService } from '../services/ShowStatementService';

class TransactionsController {
  async showStatement(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { date } = request.query;
    const path = request.url;

    const logger = Logger.getInstance().get();
    logger.info(
      'src/modules/accounts/controllers/TransactionsController.ts - method showStatement - Getting an statement in a month interval',
      { path, accountId }
    );

    const transactionsRepository = container.resolve(TransactionsRepository);
    const showStatementsService = new ShowStatementService(transactionsRepository);

    const checkDate = date ? String(date) : '';
    const statements = await showStatementsService.execute(Number(accountId), checkDate);

    return response.json(statements);
  }
}

export { TransactionsController };
