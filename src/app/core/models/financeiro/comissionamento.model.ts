export class ComissionamentoModel {
  id?: number;
  cnpjEmpresa?: string;
  produtoId?: number;
  valor?: number;
  tipo?: string;
  produto?: Produto;
  constructor(options: ComissionamentoModel = {}) {
    this.id = options.id || null;
    this.cnpjEmpresa = options.cnpjEmpresa || null;
    this.produtoId = options.produtoId || null;
    this.valor = options.valor || null;
    this.tipo = options.tipo || null;
    this.produto = options.produto || null;
  }
}
interface Produto {
  id: number;
  descricao: string;
  margemLucro: number;
  tipoProduto: string;
  valorPadrao: number;
  valorMinimo: number;
  quantidade: number;
  market: boolean;
  cfcCnpj: string;
  usuarioAlteracao: string;
  dataAlteracao: any;
  usuarioCadastro: string;
  dataCadastro: any;
  ativo: boolean;
}
