export class GrupoLancamentoModel {
  id?: number;
  descricao?: string;
  ativo?: boolean;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  usuarioCadastro?: string;
  dataCadastro?: any;
  sindauto?: boolean;

  constructor(options: GrupoLancamentoModel = {}) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.ativo = options.ativo || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.sindauto = options.sindauto || null;
  }
}
