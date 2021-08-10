import { AlertaService } from './alerta.service';
import { AulaMonitoramentoService } from './aula-monitoramento.service';
import { ConteudoService } from './conteudo.service';
import { CursoMonitoramentoService } from './curso-monitoramento.service';
import { DispositivoService } from './dispositivo.service';
import { EventoService } from './evento.service';
import { MonitoramentoResolvers } from './resolvers/_monitoramento-resolvers';
import { PlanoAulaService } from './plano-aula.service';
import { TopicoService } from './topico.service';

export const MonitoramentoServices = [
  AlertaService,
  AulaMonitoramentoService,
  ConteudoService,
  CursoMonitoramentoService,
  DispositivoService,
  EventoService,
  PlanoAulaService,
  TopicoService,
  MonitoramentoResolvers
]
