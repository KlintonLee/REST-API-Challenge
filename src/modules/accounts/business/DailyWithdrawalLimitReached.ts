import { ITransaction } from '../models/ITransaction';

class DailyWithdrawalLimitReached {
  constructor(
    private transactions: ITransaction[],
    private dailyLimit: number,
    private withdrawalValue: number
  ) {}

  execute(): boolean {
    const dailyWithdrawalsMade = this.transactions.reduce((acc, transaction) => {
      if (transaction.tipoTransacao === 'saque') {
        return acc + Number(transaction.valor);
      }

      return acc;
    }, 0);

    const newTotalWithdrawal = dailyWithdrawalsMade + this.withdrawalValue;
    if (newTotalWithdrawal <= this.dailyLimit) {
      return false;
    }

    return true;
  }
}

export { DailyWithdrawalLimitReached };
