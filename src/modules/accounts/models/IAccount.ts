interface IAccount {
  id: number;

  idPessoa: number;

  saldo: number;

  limiteSaqueDiario: number;

  flagAtivo: boolean;

  tipoConta: number;

  dataCriacao: string;
}

export { IAccount };
