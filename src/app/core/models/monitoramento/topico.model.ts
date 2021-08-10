export class TopicoModel {
  ativo?: boolean;
  descricao?: string;
  id?: number;
  idCfc?: number;

  constructor(options: TopicoModel = {}) {
    this.ativo = options.ativo || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.idCfc = options.idCfc || null;
  }
}
