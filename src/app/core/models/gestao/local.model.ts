export class LocalModel {
  ativo?: boolean;
  id?: number;
  codigoLocalDetran?: number;
  dataAlteracao?: any;
  dataCadastro?: any;
  descricao?: string;
  idUnidadeDetran?: number;
  usuarioAlteracao?: string;
  usuarioCadastro?: string;

  constructor(options: LocalModel = {}) {
    this.ativo = options.ativo || null;
    this.id = options.id || null;
    this.codigoLocalDetran = options.codigoLocalDetran || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.descricao = options.descricao || null;
    this.idUnidadeDetran = options.idUnidadeDetran || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
  }
}
