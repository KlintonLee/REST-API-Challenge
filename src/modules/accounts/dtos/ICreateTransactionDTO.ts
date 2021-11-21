type ICreateTransactionDTO = {
  idConta: number;

  valor: number;

  tipoTransacao: 'deposito' | 'saque';

  dataTransacao: string;
};

export { ICreateTransactionDTO };
