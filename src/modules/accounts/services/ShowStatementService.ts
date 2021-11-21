import { addDays, format, subDays } from 'date-fns';
import { ITransaction } from '../models/ITransaction';
import { ITransactionsRepository } from '../repositories/ITransactionsRepository';

class ShowStatementService {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(accountId: number, date: string): Promise<ITransaction[]> {
    const initialDate = date ? new Date(date) : subDays(new Date(), 30);
    const finalDate = addDays(initialDate, 30);

    const formatInitialDate = format(initialDate, 'yyyy-MM-dd HH:mm:ss');
    const formatFinalDate = format(finalDate, 'yyyy-MM-dd HH:mm:ss');

    console.log(formatInitialDate);
    console.log(formatFinalDate);
    const statements = await this.transactionsRepository.statement(
      accountId,
      formatInitialDate,
      formatFinalDate
    );

    return statements;
  }
}

export { ShowStatementService };
