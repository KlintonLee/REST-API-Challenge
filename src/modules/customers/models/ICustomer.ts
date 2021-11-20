import { RowDataPacket } from 'mysql2/promise';

interface ICustomer extends RowDataPacket {
  id: number;

  nome: string;

  cpf: string;

  dataNascimento: string;
}

export { ICustomer };
