import { RowDataPacket } from 'mysql2/promise';

interface IAccount extends RowDataPacket {
  id: number;

  idPessoa: number;

  saldo: number;

  limiteSaqueDiario: number;

  flagAtivo: boolean;

  tipoConta: number;

  dataCriacao: Date;
}

export { IAccount };
