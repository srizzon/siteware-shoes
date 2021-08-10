import { GestaoResolvers } from './resolvers/_gestao-resolvers';

import { CandidatoGestaoService } from '@services/apis/gestao/candidato-gestao.service';
import { CfcService } from '@services/apis/gestao/cfc.service';
import { CreditoMatriculaService } from '@services/apis/gestao/credito-matricula.service';
import { CursoGestaoService } from '@services/apis/gestao/curso-gestao.service';
import { ExameService } from '@services/apis/gestao/exame.service';
import { InstrutorCfcService } from './instrutor-cfc.service';
import { InstrutorService } from '@services/apis/gestao/instrutor.service';
import { LocalService } from '@services/apis/gestao/local.service';
import { MarcacaoExameDisponibilidadeBloqueioService } from '@services/apis/gestao/marcacao-exame-bloqueio-disponibilidade.service';
import { MarcacaoExameDisponibilidadeCacheService } from '@services/apis/gestao/marcacao-exame-disponibilidade-cache.service';
import { MarcacaoExameDisponibilidadeService } from '@services/apis/gestao/marcacao-exame-disponibilidade.service';
import { MarcacaoExameService } from '@services/apis/gestao/marcacao-exames.service';
import { MatriculaService } from '@services/apis/gestao/matricula.service';
import { ProcessosService } from '@services/apis/gestao/processos.service';
import { ServicoGestaoService } from '@services/apis/gestao/servico-gestao.service';
import { UnidadeDetranService } from '@services/apis/gestao/unidade-detran.service';
import { VeiculoCfcService } from '@services/apis/gestao/veiculo-cfc.service';
import { VeiculoService } from './veiculo.service';

export const GestaoServices = [
  CandidatoGestaoService,
  CfcService,
  CreditoMatriculaService,
  CursoGestaoService,
  ExameService,
  InstrutorService,
  InstrutorCfcService,
  LocalService,
  MarcacaoExameDisponibilidadeBloqueioService,
  MarcacaoExameDisponibilidadeCacheService,
  MarcacaoExameDisponibilidadeService,
  MarcacaoExameService,
  MatriculaService,
  ProcessosService,
  ServicoGestaoService,
  UnidadeDetranService,
  VeiculoCfcService,
  VeiculoService,

  GestaoResolvers
]
