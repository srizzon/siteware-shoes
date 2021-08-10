import { ServicoAgendamentoResolver } from './servico-agendamento.resolver';
import { MatriculaAgendamentoResolver } from './matricula-agendamento.resolver';
import { InstrutorAgendamentoResolver } from './instrutor-agendamento.resolver';
import { CursoAgendamentoResolver } from './curso-agendamento.resolver';
import { CfcAgendamentoResolver } from './cfc-agendamento.resolver';
import { AgendamentosPorIdCandidatoResolver } from './agendamentos-por-id-candidato.resolver';
import { AgendamentosResolver } from './agendamentos.resolver';
import { CandidatosPorIdAgendamentoResolver } from './candidato-por-id-agendamento.resolver';
import { GradeCandidatoResolver } from './grade-canidato.resolver';
import { GradePorIdResolver } from './grade-por-id.resolver';

export const AgendamentoResolver = [
  AgendamentosPorIdCandidatoResolver,
  AgendamentosResolver,
  CandidatosPorIdAgendamentoResolver,
  CfcAgendamentoResolver,
  CursoAgendamentoResolver,
  GradeCandidatoResolver,
  GradePorIdResolver,
  InstrutorAgendamentoResolver,
  MatriculaAgendamentoResolver,
  ServicoAgendamentoResolver
]
