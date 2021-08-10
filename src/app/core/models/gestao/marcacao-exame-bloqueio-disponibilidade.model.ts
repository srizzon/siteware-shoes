export class MarcacaoExameDisponibilidadeBloqueio {
  id?: number;
  idLocal?: number;
  idExame?: number;
  idMarcacaoExameDisponibilidade?: number;
  diaSemana?: string;
  turno?: string;
  observacao?: string;
  usuarioCadastro?: string;
  dataCadastro?: Date;
  ativo?: boolean;
  exame?: any;
  local?: any;
  dataInicio?: Date;
  dataFim?: Date;

  constructor(
    options: MarcacaoExameDisponibilidadeBloqueio = {}
  ) {
    this.id = options.id || null;
    this.idLocal = options.idLocal || null;
    this.idExame = options.idExame || null;
    this.idMarcacaoExameDisponibilidade = options.idMarcacaoExameDisponibilidade || null;
    this.diaSemana = options.diaSemana || null;
    this.turno = options.turno || null;
    this.observacao = options.observacao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.dataInicio = options.dataInicio || null;
    this.dataFim = options.dataFim || null;
    this.ativo = options.ativo || null;
    this.exame = options.exame || null;
    this.local = options.local || null;
  }
}
