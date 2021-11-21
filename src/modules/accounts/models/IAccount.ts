interface IAccount {
  id: number;

  idPessoa: number;

  saldo: number;

  limiteSaqueDiario: number;

  flagAtivo: boolean;

  tipoConta: number;

  dataCriacao: Date;
}

export { IAccount };
