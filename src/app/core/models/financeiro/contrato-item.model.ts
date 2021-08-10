export class ContratoItemModel {
  id?: number;
  contratoId?: number;
  produtoId?: number;
  produtoPacoteId?: number;
  quantidade?: number;
  valor?: number;
  ativo?: boolean;
  usuarioCadastro?: string;
  dataCadastro?: any;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  produto?: Produto;
  
  constructor(options: ContratoItemModel = {}) {
    this.id = options.id || null;
    this.contratoId = options.contratoId || null;
    this.produtoId = options.produtoId || null;
    this.produtoPacoteId = options.produtoPacoteId || null;
    this.quantidade = options.quantidade || null;
    this.valor = options.valor || null;
    this.ativo = options.ativo || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.produto = options.produto || null;
  }
}

interface Produto {
  id?: number;
  descricao?: string;
  margemLucro?: number;
  tipoProduto?: string;
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
}
