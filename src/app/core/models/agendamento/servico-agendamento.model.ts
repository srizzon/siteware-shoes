export class ServicoAgendamentoModel {

  id?: number;
  idExterno?: string;
  descricao?: string;

  constructor(options: ServicoAgendamentoModel = {}) {
    this.id = options.id || null;
    this.idExterno = options.idExterno || null;
    this.descricao = options.descricao || null;
  }
}
