export class MarcacaoExameDisponibilidade {
    id?: number;
    localId?: number;
    exameId?: number;
    exame?: any;
    local?: any;
    horario?: string;
    situacao?: number;
    status?: string;
    codigoTurma?: string;
    quantidadeVagas?: number;
    ativo?: boolean;
    ativoBySituacao?: boolean;

  constructor(
    options: MarcacaoExameDisponibilidade = {}
  ) {
    this.id = options.id || null;
    this.localId = options.localId || null;
    this.exameId = options.exameId || null;
    this.exame = options.exame || null;
    this.local = options.local || null;
    this.horario = options.horario || null;
    this.situacao = options.situacao || null;
    this.codigoTurma = options.codigoTurma || null;
    this.quantidadeVagas = options.quantidadeVagas || null;
    this.ativo = options.ativo || null;
    this.ativoBySituacao = options.ativoBySituacao || null;
  }
}
