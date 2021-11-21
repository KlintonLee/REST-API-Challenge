import { RowDataPacket } from 'mysql2/promise';

interface ITransaction extends RowDataPacket {
  id: number;

  idConta: number;

  valor: number;

  tipoTransacao: 'deposito' | 'saque';

  dataTransacao: Date;
}

export { ITransaction };
