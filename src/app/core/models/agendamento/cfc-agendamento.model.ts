export class CfcAgendamentoModel {
  id?: number;
  nome?: string;
  cnpj?: string;

  constructor(options: CfcAgendamentoModel = {}) {
    this.id = options.id || null;
    this.nome = options.nome || null;
    this.cnpj = options.cnpj || null;
  }
}
