import { MarcacaoExameHorarioModel } from './marcacao-exame-horario.model';

export class MarcacaoExameDisponibilidadeCache {
  id?: number;
  idLocal?: number;
  descricaoLocal?: string;
  idExame?: number;
  descricaoExame?: string;
  data?: any;
  diaSemana?: string;
  horarios?: MarcacaoExameHorarioModel[];
  quantidadeVagasTotalAgendada?: number;
  quantidadeVagasTotalDisponivel?: number;
  quantidadeVagasTotalOfertada?: number;

  constructor(
    options: MarcacaoExameDisponibilidadeCache = {}
  ) {
    this.id = options.id || null;
    this.idLocal = options.idLocal || null;
    this.descricaoLocal = options.descricaoLocal || null;
    this.idExame = options.idExame || null;
    this.descricaoExame = options.descricaoExame || null;
    this.data = options.data || null;
    this.diaSemana = options.diaSemana || null;
    this.horarios = options.horarios || null;
    this.quantidadeVagasTotalAgendada = options.quantidadeVagasTotalAgendada || null;
    this.quantidadeVagasTotalDisponivel = options.quantidadeVagasTotalDisponivel || null;
    this.quantidadeVagasTotalOfertada = options.quantidadeVagasTotalOfertada || null;
  }
}

