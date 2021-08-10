import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';
export class CandidatoAgendamentoModel {
  agendamento?: AgendamentoInterface;
  cfc?: CfcInterface;
  dataCadastro?: any;
  id?: number;
  matricula?: MatriculaInterface;
  usuarioCadastro?: string;

  constructor(options: CandidatoAgendamentoModel = {}) {
    this.agendamento = options.agendamento || null;
    this.cfc = options.cfc || null;
    this.dataCadastro = options.dataCadastro || null;
    this.id = options.id || null;
    this.matricula = options.matricula || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
  }
}

interface AgendamentoInterface {
  agenda?: any;
  agendaFim?: any;
  aulas?: [];
  candidatos?: any;
  cfc?: CfcInterface;
  dataCadastro?: any;
  fim?: any;
  grade?: GradeInterface;
  id?: number;
  idExterno?: string;
  inicio?: any;
  instrutor?: InstrutorInterface;
  limiteParticipantes?: number;
  modelo?: string;
  percentualMinimoPresenca?: number;
  permiteCancelamento?: boolean;
  qtdHorasAula?: number;
  quantidadeParticipantesAgendados?: number;
  quantidadeSegundosAgendados?: number;
  servico?: ServicoAgendamentoModel;
  situacao?: string;
  tipoAgendamento?: TipoAgendamentoInterface;
  turno?: string;
  usuarioCadastro?: string;
}

interface CfcInterface {
  cnpj?: string;
  id?: number;
  idUnidadeDetran?: number;
  nome?: string;
}

interface GradeInterface {
  cfc?: CfcInterface;
  dataInicio?: any;
  dataInicioRealizado?: any;
  dataTermino?: any;
  dataTerminoRealizado?: any;
  descricao?: string;
  gradeServico?: GradeServicoInterface;
  id?: number;
  indicadorDiasUteis?: boolean;
  indicadorDistribuicaoRealizada?: boolean;
  instrutor?: InstrutorInterface;
  modelo?: string;
  qtdMaximoParticipantes?: number;
  qtdVagasDisponiveis?: number;
  servico?: ServicoAgendamentoModel;
  situacao?: string;
  turno?: string;
}

interface GradeServicoInterface {
  ativo?: boolean;
  descricao?: string;
  horaInicio?: string;
  horaTermino?: string;
  id?: number;
  qtdDiasPrevistoConclusao?: number;
  servico?: ServicoAgendamentoModel;
  turno?: string;
}

interface InstrutorInterface {
  cpf?: string;
  id?: number;
  idExterno?: string;
  nome?: string;
}
interface TipoAgendamentoInterface {
  descricao?: string;
  id?: number;
}

interface MatriculaInterface {
  candidato?: CandidatoInterface;
  cfc?: CfcInterface;
  id?: number;
  idExterno?: string;
  numeroProcesso?: string;
}

interface CandidatoInterface {
  cpf?: string;
  dataNascimento?: any;
  email?: string;
  id?: number;
  idExterno?: string;
  nome?: string;
  telefone?: string;
}
