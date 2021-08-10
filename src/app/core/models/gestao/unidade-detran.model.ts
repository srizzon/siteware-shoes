export class UnidadeDetran {
  ativo?: boolean;
  dataAlteracao?: any;
  dataCadastro?: any;
  descricao?: string;
  id?: number;
  nomeFantasia?: string;
  regiaoSindicatoId?: number;
  uf?: string;
  usuarioAlteracao?: string;
  usuarioCadastro?: string;
  unidadeDetranPaiId?: number;

  constructor(options: UnidadeDetran = {}) {
    this.ativo = options.ativo || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.nomeFantasia = options.nomeFantasia || null;
    this.regiaoSindicatoId = options.regiaoSindicatoId || null;
    this.uf = options.uf || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.unidadeDetranPaiId = options.unidadeDetranPaiId || null;
  }
}
