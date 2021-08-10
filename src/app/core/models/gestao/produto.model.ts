export class Produto {
  id?: number;
  cfcId?: number;
  cfcNome?: string;
  tipoCreditoId?: number;
  tipoCreditoDescricao?: string;
  descricao?: string;
  tipoProduto?: string;
  margemLucro?: number;
  liberacao?: boolean;
  market?: boolean;
  ativo?: boolean;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  usuarioCadastro?: string;
  dataCadastro?: any;
  valorMinimo?: number;

  constructor(
    options: {
      id?: number;
      cfcId?: number;
      cfcNome?: string;
      tipoCreditoId?: number;
      tipoCreditoDescricao?: string;
      descricao?: string;
      tipoProduto?: string;
      margemLucro?: number;
      liberacao?: boolean;
      market?: boolean;
      ativo?: boolean;
      usuarioAlteracao?: string;
      dataAlteracao?: any;
      usuarioCadastro?: string;
      dataCadastro?: any;
      valorMinimo?: number;
    } = {}
  ) {
    this.id = options.id || null;
    this.cfcId = options.cfcId || null;
    this.cfcNome = options.cfcNome || null;
    this.tipoCreditoId = options.tipoCreditoId || null;
    this.tipoCreditoDescricao = options.tipoCreditoDescricao || null;
    this.descricao = options.descricao || null;
    this.tipoProduto = options.tipoProduto || null;
    this.margemLucro = options.margemLucro || null;
    this.liberacao = options.liberacao || null;
    this.market = options.market || null;
    this.ativo = options.ativo || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro
    this.valorMinimo = options.valorMinimo || null;
  }
}
