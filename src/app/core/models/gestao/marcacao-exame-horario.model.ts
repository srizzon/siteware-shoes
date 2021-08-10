export class MarcacaoExameHorarioModel {
  bloqueado?: boolean;
  bloqueadoDescricao?: string;
  data?: any;
  exame?: string;
  hora?: string;
  idExame?: number;
  idLocal?: number;
  local?: string;
  marcacaoExameDisponibilidadeId?: number;
  periodo?: string;
  quantidadeVagasAgendadas?: number;
  quantidadeVagasDisponiveis?: number;
  quantidadeVagasOfertadas?: number;

  constructor(options: MarcacaoExameHorarioModel = {}) {
    this.bloqueado = options.bloqueado || null;
    this.bloqueadoDescricao = options.bloqueadoDescricao || null;
    this.data = options.data || null;
    this.exame = options.exame || null;
    this.hora = options.hora || null;
    this.idExame = options.idExame || null;
    this.idLocal = options.idLocal || null;
    this.local = options.local || null;
    this.marcacaoExameDisponibilidadeId = options.marcacaoExameDisponibilidadeId || null;
    this.periodo = options.periodo || null;
    this.quantidadeVagasAgendadas = options.quantidadeVagasAgendadas || null;
    this.quantidadeVagasDisponiveis = options.quantidadeVagasDisponiveis || null;
    this.quantidadeVagasOfertadas = options.quantidadeVagasOfertadas || null;
  }
}
