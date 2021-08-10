
export class TipoDeLancamentoModel {
  id?: number;
  descricao?: string;
  tipo?: string;
  ativo?: boolean;
  grupoLancamentoId?: number;
  valorPadrao?: number;
  dataCadastro?: any;
  usuarioCadastro?: string;
  dataAlteracao?: any;
  usuarioAlteracao?: string;

  constructor(options: TipoDeLancamentoModel = {}) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.tipo = options.tipo || null;
    this.ativo = options.ativo || null;
    this.grupoLancamentoId = options.grupoLancamentoId || null;
    this.valorPadrao = options.valorPadrao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
  }
}
