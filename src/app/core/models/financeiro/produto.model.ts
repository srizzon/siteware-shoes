export class Produto {
  id?: number;
  descricao?: string;
  margemLucro?: number;
  tipoProduto?: any;
  valorPadrao?: number;
  valorMinimo?: number;
  quantidade?: number;
  market?: boolean;
  cfcCnpj?: string;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  usuarioCadastro?: string;
  dataCadastro?: any;
  ativo?: boolean;

  constructor(options: Produto = {}) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.margemLucro = options.margemLucro || null;
    this.tipoProduto = options.tipoProduto || null;
    this.valorPadrao = options.valorPadrao || null;
    this.valorMinimo = options.valorMinimo || null;
    this.quantidade = options.quantidade || null;
    this.market = options.market || null;
    this.cfcCnpj = options.cfcCnpj || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.ativo = options.ativo || null;
  }
}
