import { AlertaPorIdResolver } from './alerta-por-id.resolver';
import { AulaMonitoramentoResolver } from './aula-monitoramento.resolver';
import { AulaMonitoramentoPorIdResolver } from './aula-monitoramento-por-id.resolver';
import { ConteudoPorIdResolver } from './conteudo-por-id.resolver';
import { ConteudoPorPlanoDeAulaResolver } from './conteudo-por-plano-aula.resolver';
import { ConteudoResolver } from './conteudo.resolver';
import { CursoMonitoramentoPorIdResolver } from './curso-monitoramento-por-id.resolver';
import { CursoMonitoramentoPorCfcResolver } from './curso-monitoramento-por-cfc.resolver';
import { DispositivosPorCfcResolver } from './dispositivos-por-cfc.resolver';
import { DispositivosPorIdResolver } from './dispositivos-por-id.resolver';
import { EventoPorIdResolver } from './evento-por-id.resolver';
import { PlanoAulaPorCfcResolver } from './plano-aula-por-cfc.resolver';
import { PlanoAulaPorIdResolver } from './plano-aula-por-id.resolver';
import { TopicoResolver } from './topico.resolver';

export const MonitoramentoResolvers = [
  AlertaPorIdResolver,
  AulaMonitoramentoPorIdResolver,
  AulaMonitoramentoResolver,
  ConteudoPorIdResolver,
  ConteudoPorPlanoDeAulaResolver,
  ConteudoResolver,
  CursoMonitoramentoPorCfcResolver,
  CursoMonitoramentoPorIdResolver,
  DispositivosPorCfcResolver,
  DispositivosPorIdResolver,
  EventoPorIdResolver,
  PlanoAulaPorCfcResolver,
  PlanoAulaPorIdResolver,
  TopicoResolver
]
