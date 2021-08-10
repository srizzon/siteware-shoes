import { FinancialContractStatus } from '@enums/financial-contract-status.enum';

export const SituationStatus: {id: FinancialContractStatus, descricao: string}[] = [
  {
    id: FinancialContractStatus.PENDENTE,
    descricao: 'PENDENTE'
  },
  {
    id: FinancialContractStatus.PAGO,
    descricao: 'PAGO'
  },
  {
    id: FinancialContractStatus.VENCIDO,
    descricao: 'VENCIDO'
  },
  {
    id: FinancialContractStatus.CANCELADO,
    descricao: 'CANCELADO'
  }
];
