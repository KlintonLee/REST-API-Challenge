import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { TransactionsRepository } from '../repositories/TransactionsRepository';
import { ShowStatementService } from '../services/ShowStatementService';

class TransactionsController {
  async showStatement(request: Request, response: Response): Promise<Response> {
    const { accountId } = request.params;
    const { date } = request.query;

    const transactionsRepository = container.resolve(TransactionsRepository);
    const showStatementsService = new ShowStatementService(transactionsRepository);

    const checkDate = date ? String(date) : '';
    const statements = await showStatementsService.execute(Number(accountId), checkDate);

    return response.json(statements);
  }
}

export { TransactionsController };
