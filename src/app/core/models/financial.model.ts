import { FinancialContractStatus } from '../enums/financial-contract-status.enum';
export interface Ticket {
  valor: string;
  produtoId: number;
  cpfCandidato: string;
  cnpjEmpresa: string;
}

export interface Product {
  id: number;
  descricao: string;
  tipoProduto: string;
  margemLucro: number;
  valorMinimo: number;
}
export interface Contract {
  id: number;
  entidadeId: number;
  cnpjEmpresa: string;
  dataInicio: Date;
  dataEncerramento: Date;
  dataPrimeiraParcela: Date;
  valorGlobal: number;
  descontos: number;
  valorLiquido: number;
  valorParcelas: number;
  numeroCandidato?: string;
  nomeCandidato?: string;
  nomeCfc?: string;
  parcelas: number;
  tipoContrato: string;
  situacaoContrato: FinancialContractStatus;
  capa: string;
  carne: any;
  boleto: string;
  entidade: Entity;
  lancamentosFinanceiros: FinancialRelease[];
}

interface Entity {
  id: number;
  documento: string;
  tipo: string;
  cfc: boolean;
  ativo: boolean;
  dataCadastro: Date;
  usuarioCadastro: string;
  dataAlteracao: Date;
  usuarioAlteracao: number;
}

export interface FinancialRelease {
  id: number;
  contratoId: number;
  tipoLancamentoId: number;
  formaPagamentoId: number;
  valor: number;
  valorTitulo: number;
  valorPago: number;
  dataEmissao: Date;
  dataPagamento: Date;
  dataBaixa: Date;
  dataVencimento: Date;
  status:	FinancialContractStatus;
  statusIntegracao: string;
  corneId: any;
  boletoId: string;
  parcela: number;
  url: string;
  usuarioCadastro: string;
  dataCadastro: Date;
  usuarioAlteracao: any;
  dataAlteracao: Date;
  tipolancamento?: FinancialReleaseType;
}

interface FinancialReleaseType {
  id: number;
  descricao: string;
  tipo: string;
  grupoLancamentoId: number;
  valorPadrão: number;
}

export interface FinancialReleasesReturn {
  debito: number;
  credito: number;
  total: number;
  lancamentos: FinancialRelease[];
}
export interface Audit {
  id: number;
  contratoId: number;
  cpfCandidato: string;
  cnpjEmpresa: string;
  lancamentoFinanceiroId: number;
  token: string;
  tipo: string;
  descricao: string;
  carneId: any;
  boletoId: string;
  dataVencimento: Date;
  valor: number;
  parcela: number;
  statusAtual: string;
  statusAnterior: string;
  usuarioCadastro: string;
  dataCadastro: Date;
}

export interface Bank {
  id: number;
  descricao: string;
  codigoBanco: string;
}

