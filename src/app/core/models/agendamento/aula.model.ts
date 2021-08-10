export class AulaModel {
  agendamentoAgenda?: any;
  agendamentoAgendaFim?: any;
  agendamentoCfcCnpj?: string;
  agendamentoCfcNome?: string;
  agendamentoId?: number;
  agendamentoInstrutorCpf?: number;
  agendamentoInstrutorNome?: string;
  agendamentoLimiteParticipantes?: number;
  agendamentoModelo?: string;
  agendamentoQuantidadeParticipantesAgendados?: number;
  agendamentoTurno?: string;
  codCursoExterno?: number;
  conteudoProgramatico?: string;
  cursoDescricao?: string;
  cursoId?: number;
  fim?: any;
  id?: number;
  idExterno?: number;
  inicio?: any;
  intervalo?: number;
  numeroAula?: number;
  vagasDisponiveis?: number;

  constructor(
    options: AulaModel = {}
  ) {
    this.agendamentoAgenda = options.agendamentoAgenda || null;
    this.agendamentoAgendaFim = options.agendamentoAgendaFim || null;
    this.agendamentoCfcCnpj = options.agendamentoCfcCnpj || null;
    this.agendamentoCfcNome = options.agendamentoCfcNome || null;
    this.agendamentoId = options.agendamentoId || null;
    this.agendamentoInstrutorCpf = options.agendamentoInstrutorCpf || null;
    this.agendamentoInstrutorNome = options.agendamentoInstrutorNome || null;
    this.agendamentoLimiteParticipantes = options.agendamentoLimiteParticipantes || null;
    this.agendamentoModelo = options.agendamentoModelo || null;
    this.agendamentoQuantidadeParticipantesAgendados = options.agendamentoQuantidadeParticipantesAgendados || null;
    this.agendamentoTurno = options.agendamentoTurno || null;
    this.codCursoExterno = options.codCursoExterno || null;
    this.conteudoProgramatico = options.conteudoProgramatico || null;
    this.cursoDescricao = options.cursoDescricao || null;
    this.cursoId = options.cursoId || null;
    this.fim = options.fim || null;
    this.id = options.id || null;
    this.idExterno = options.idExterno || null;
    this.inicio = options.inicio || null;
    this.intervalo = options.intervalo || null;
    this.numeroAula = options.numeroAula || null;
    this.vagasDisponiveis = options.vagasDisponiveis || null;
  }
}
