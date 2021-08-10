import { ContratoItemModel } from "./contrato-item.model";
import { LancamentoFinanceiroModel } from "./lancamento-financeiro.model";

export class ContratoFinanceiroModel {
  id?: number;
  entidadeId?: number;
  entidadeDocumento?: string;
  entidadeNome?: string;
  matriculaId?: number;
  quantidade?: number;
  contratoPaiId?: number;
  cnpjEmpresa?: string;
  descricao?: string;
  pedenciaFinanceira?: boolean;
  dataInicio?: any;
  dataEncerramento?: any;
  dataPrimeiraParcela?: any;
  valorGlobal?: number;
  descontos?: number;
  valorLiquido?: number;
  valorParcelas?: number;
  parcelas?: number;
  tipoContrato?: string;
  situacaoContrato?: string;
  capa?: string;
  carne?: string;
  statusCarne?: string;
  boleto?: string;
  usuarioCadastro?: string;
  dataCadastro?: any;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  contratoItens?: ContratoItemModel[];
  lancamentosFinanceiros?: LancamentoFinanceiroModel[];
  descricaoProduto?: string;

  constructor(options: ContratoFinanceiroModel = {}) {
    this.id = options.id || null;
    this.entidadeId = options.entidadeId || null;
    this.contratoPaiId = options.contratoPaiId || null;
    this.matriculaId = options.matriculaId || null;
    this.cnpjEmpresa = options.cnpjEmpresa || null;
    this.descricao = options.descricao || null;
    this.pedenciaFinanceira = options.pedenciaFinanceira || null;
    this.dataInicio = options.dataInicio || null;
    this.dataEncerramento = options.dataEncerramento || null;
    this.dataPrimeiraParcela = options.dataPrimeiraParcela || null;
    this.valorGlobal = options.valorGlobal || null;
    this.descontos = options.descontos || null;
    this.valorLiquido = options.valorLiquido || null;
    this.valorParcelas = options.valorParcelas || null;
    this.parcelas = options.parcelas || null;
    this.tipoContrato = options.tipoContrato || null;
    this.situacaoContrato = options.situacaoContrato || null;
    this.capa = options.capa || null;
    this.carne = options.carne || null;
    this.statusCarne = options.statusCarne || null;
    this.boleto = options.boleto || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.contratoItens = options.contratoItens || null;
    this.lancamentosFinanceiros = options.lancamentosFinanceiros || null;
  }
}
