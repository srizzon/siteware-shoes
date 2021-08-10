import { AulaModel } from '@models/outros/aula.model';

export class AgendamentoRequestModel {
  agenda?: any;
  agendaFim?: any;
  aulas?: AulaModel[];
  cfcCnpj?: string;
  cfcId?: number;
  id?: number;
  instrutorCpf?: string;
  instrutorId?: number;
  intervalo?: number;
  limiteParticipantes?: number;
  modelo?: string;
  permiteCancelamento?: boolean;
  servicoId?: number;
  situacao?: string;
  tipoAgendamentoId?: number;
  turno?: string;

  constructor(options: AgendamentoRequestModel = {}) {
    this.agenda = options.agenda || null;
    this.agendaFim = options.agendaFim || null;
    this.aulas = options.aulas || null;
    this.cfcCnpj = options.cfcCnpj || null;
    this.cfcId = options.cfcId || null;
    this.id = options.id || null;
    this.instrutorCpf = options.instrutorCpf || null;
    this.instrutorId = options.instrutorId || null;
    this.intervalo = options.intervalo || null;
    this.limiteParticipantes = options.limiteParticipantes || null;
    this.modelo = options.modelo || null;
    this.permiteCancelamento = options.permiteCancelamento || null;
    this.servicoId = options.servicoId || null;
    this.situacao = options.situacao || null;
    this.tipoAgendamentoId = options.tipoAgendamentoId || null;
    this.turno = options.turno || null;
  }
}
