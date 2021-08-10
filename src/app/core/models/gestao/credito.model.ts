export class Credito {
  id?: number;
  ativo?: boolean;
  descricao?: string;
  usuarioCadastro?: string;
  dataCadastro?: any;
  utilizados?: number;
  total?: number;
  disponiveis?: number;

  constructor(options: Credito = {}) {
    this.id = options.id || null;
    this.ativo = options.ativo || null;
    this.descricao = options.descricao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.utilizados = options.utilizados || null;
    this.total = options.total || null;
    this.disponiveis = options.disponiveis || null;
  }
}
