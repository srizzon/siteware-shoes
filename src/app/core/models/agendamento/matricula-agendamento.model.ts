export class MatriculaAgendamentoModel {
  id?: number;
  idExterno?: string;
  numeroProcesso?: string;
  candidatoNome?: string;
  candidatoCpf?: string;
  cfcNome?: string;
  cfcCnpj?: string;

  constructor(options: MatriculaAgendamentoModel = {}) {
    this.id = options.id || null;
    this.idExterno = options.idExterno || null;
    this.numeroProcesso = options.numeroProcesso || null;
    this.candidatoNome = options.candidatoNome || null;
    this.candidatoCpf = options.candidatoCpf || null;
    this.cfcNome = options.cfcNome || null;
    this.cfcCnpj = options.cfcCnpj || null;
  }
}
