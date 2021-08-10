import { AulaModel } from '@models/outros/aula.model';
export class AgendamentoModel {
  agenda?: any;
  agendaFim?: any;
  aulas?: AulaModel[];
  candidatos?: any[];
  cfcCnpj?: string;
  cfcNome?: string;
  codServicoExterno?: any;
  fim?: any;
  gradeDescricao?: string;
  gradeId?: number;
  id?:  number;
  idExterno?: string;
  inicio?: any;
  instrutorCpf?: string;
  instrutorId?: number;
  instrutorNome?: string;
  limiteParticipantes?: number;
  modelo?: string;
  percentualMinimoPresenca?: number;
  permiteCancelamento?: boolean;
  quantidadeSegundosAgendados?: number;
  servicoDescricao?: string;
  servicoId?: number;
  situacao?: string;
  tipoAgendamentoDescricao?: string;
  tipoAgendamentoId?: number;
  turno?: any;

  constructor(
    options: AgendamentoModel = {}
  ) {
    this.agenda = options.agenda || null;
    this.agendaFim = options.agendaFim || null;
    this.aulas = options.aulas || null;
    this.candidatos = options.candidatos || null;
    this.cfcCnpj = options.cfcCnpj || null;
    this.cfcNome = options.cfcNome || null;
    this.codServicoExterno = options.codServicoExterno || null;
    this.fim = options.fim || null;
    this.gradeDescricao = options.gradeDescricao || null;
    this.gradeId = options.gradeId || null;
    this.id = options.id || null;
    this.idExterno = options.idExterno || null;
    this.inicio = options.inicio || null;
    this.instrutorCpf = options.instrutorCpf || null;
    this.instrutorId = options.instrutorId || null;
    this.instrutorNome = options.instrutorNome || null;
    this.limiteParticipantes = options.limiteParticipantes || null;
    this.modelo = options.modelo || null;
    this.percentualMinimoPresenca = options.percentualMinimoPresenca || null;
    this.permiteCancelamento = options.permiteCancelamento || null;
    this.quantidadeSegundosAgendados = options.quantidadeSegundosAgendados || null;
    this.servicoDescricao = options.servicoDescricao || null;
    this.servicoId = options.servicoId || null;
    this.situacao = options.situacao || null;
    this.tipoAgendamentoDescricao = options.tipoAgendamentoDescricao || null;
    this.tipoAgendamentoId = options.tipoAgendamentoId || null;
    this.turno = options.turno || null;
  }
}


