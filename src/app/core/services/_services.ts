import { AgendamentoPraticoServices } from './apis/agendamento-pratico/_agendamento-pratico';
import { AgendamentoServices } from './apis/agendamento/_agendamento';
import { DocumentoServices } from './apis/documento/_documento';
import { FinanceiroServices } from './apis/financeiro/_financeiro';
import { GestaoServices } from './apis/gestao/_gestao';
import { ItendidateServices } from './apis/identidade/_identidade';
import { MonitoramentoServices } from './apis/monitoramento/_monitoramento';

export const Services = [
  AgendamentoPraticoServices,
  AgendamentoServices,
  DocumentoServices,
  FinanceiroServices,
  GestaoServices,
  ItendidateServices,
  MonitoramentoServices,
]
