interface ITransaction {
  id: number;

  idConta: number;

  valor: number;

  tipoTransacao: 'deposito' | 'saque';

  dataTransacao: string;
}

export { ITransaction };
