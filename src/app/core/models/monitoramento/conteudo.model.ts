export class ConteudoModel {
  ativo?: boolean;
  codigo?: string;
  descricao?: string;
  id?: number;
  nome?: string;
  topicoId?: number;

  constructor(options: ConteudoModel = {}) {
    this.ativo = options.ativo || null;
    this.codigo = options.codigo || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.nome = options.nome || null;
    this.topicoId = options.topicoId || null;
  }
}
