export class GradeCandidatoModel {

  ativo?: boolean;
  candidatoCpf?: string;
  candidatoNome?: string;
  dataAlteracao?: any;
  dataCriacao?: any;
  gradeId?: number;
  id?: number;
  matriculaId?: number;
  observacao?: string;

  constructor(options: GradeCandidatoModel = {}) {
    this.ativo = options.ativo || null;
    this.candidatoCpf = options.candidatoCpf || null;
    this.candidatoNome = options.candidatoNome || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCriacao = options.dataCriacao || null;
    this.gradeId = options.gradeId || null;
    this.id = options.id || null;
    this.matriculaId = options.matriculaId || null;
    this.observacao = options.observacao || null;
  }
}
