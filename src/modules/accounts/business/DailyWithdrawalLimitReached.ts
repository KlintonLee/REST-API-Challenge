import { Logger } from '../../../common/Logger';
import { ITransaction } from '../models/ITransaction';

class DailyWithdrawalLimitReached {
  constructor(
    private transactions: ITransaction[],
    private dailyLimit: number,
    private withdrawalValue: number
  ) {}

  execute(): boolean {
    const logger = Logger.getInstance().get();

    const dailyWithdrawalsMade = this.transactions.reduce((acc, transaction) => {
      if (transaction.tipoTransacao === 'saque') {
        return acc + Number(transaction.valor);
      }

      return acc;
    }, 0);

    logger.info(
      'src/modules/accounts/business/DailyWithdrawalLimitReached.ts - method execute - Total withdrawal already made today',
      {
        totalWithdrawal: dailyWithdrawalsMade,
        dailyLimit: this.dailyLimit,
        withdrawal: this.withdrawalValue,
      }
    );

    const newTotalWithdrawal = dailyWithdrawalsMade + this.withdrawalValue;
    if (newTotalWithdrawal <= this.dailyLimit) {
      return false;
    }

    return true;
  }
}

export { DailyWithdrawalLimitReached };
