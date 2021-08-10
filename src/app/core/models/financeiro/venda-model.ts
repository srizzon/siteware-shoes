export class Venda {
  formaPagamentoId?: number;
  modoPagamentoContaId?: number;
  documentoEntidade?: string;
  nomeEntidade?: string;
  emailEntidade?: string;
  telefoneEntidade?: string;
  cnpjEmpresa?: string;
  nomeEmpresa?: string;
  produto?: Produto[];
  valor?: number;
  desconto?: number;
  matriculaId?: number;

  constructor(options: Venda = {}) {
    this.formaPagamentoId = options.formaPagamentoId || null;
    this.modoPagamentoContaId = options.modoPagamentoContaId || null;
    this.documentoEntidade = options.documentoEntidade || null;
    this.nomeEntidade = options.nomeEntidade || null;
    this.emailEntidade = options.emailEntidade || null;
    this.telefoneEntidade = options.telefoneEntidade || null;
    this.cnpjEmpresa = options.cnpjEmpresa || null;
    this.nomeEmpresa = options.nomeEmpresa || null;
    this.produto = options.produto || null;
    this.valor = options.valor || null;
    this.desconto = options.desconto || null;
    this.matriculaId = options.matriculaId || null;
  }
}

interface Produto {
  id?: number;
  quantidade?: number;
}
