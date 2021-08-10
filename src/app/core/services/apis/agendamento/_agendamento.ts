import { AgendamentoResolver } from './resolvers/_agendamento-resolvers';
import { AgendamentoService } from '@services/apis/agendamento/agendamento.service';
import { AulaService } from '@services/apis/agendamento/aula.service';
import { CandidatoAgendamentoService } from '@services/apis/agendamento/candidato-agendamento.service';
import { CfcAgendamentoService } from '@services/apis/agendamento/cfc-agendamento.service';
import { CursoAgendamentoService } from '@services/apis/agendamento/curso-agendamento.service';
import { DistribuicaoService } from '@services/apis/agendamento/distribuicao.service';
import { GradeCandidatoService } from '@services/apis/agendamento/grade-candidato.service';
import { GradesService } from '@services/apis/agendamento/grades.service';
import { GradeServicoCursoOrdemService } from '@services/apis/agendamento/grade-servico-curso-oredem.service';
import { GradesServicoDistribuicaoService } from '@services/apis/agendamento/grades-servicos-distribuicao.service';
import { InstrutorAgendamentoService } from '@services/apis/agendamento/instrutor-agendamento.service';
import { MatriculaAgendamentoService } from '@services/apis/agendamento/matricula-agendamento.service';
import { ServicoAgendamentoService } from '@services/apis/agendamento/servico-agendamento.service';
import { UsuarioService } from '@services/apis/agendamento/usuario.service';

export const AgendamentoServices = [
  AgendamentoService,
  AulaService,
  CandidatoAgendamentoService,
  CfcAgendamentoService,
  CursoAgendamentoService,
  DistribuicaoService,
  GradeCandidatoService,
  GradesService,
  GradeServicoCursoOrdemService,
  GradesServicoDistribuicaoService,
  GradesService,
  InstrutorAgendamentoService,
  MatriculaAgendamentoService,
  ServicoAgendamentoService,
  UsuarioService,

  AgendamentoResolver
]
