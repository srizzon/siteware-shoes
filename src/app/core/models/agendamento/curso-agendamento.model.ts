export class CursoAgendamentoModel {

  id?: number;
  idExterno?: string;
  descricao?: string;

  constructor(options: CursoAgendamentoModel = {}) {
    this.id = options.id || null;
    this.idExterno = options.idExterno || null;
    this.descricao = options.descricao || null;
  }
}
