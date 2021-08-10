import { MarcacaoExamePorIdResolver } from './marcacao-exame-por-id.resolver';
import { CfcPorCnpjResolver } from './cfc-por-cnpj.resolver';
import { CfcResolver } from './cfc.resolver';
import { TipoExameResolver } from './tipo-exame.resolver';
import { InstrutorCfcResolver } from './instrutor-cfc.resolver';
import { InstrutorPorCpfResolver } from './instrutor-por-cpf.resolver';
import { InstrutorResolver } from './instrutor.resolver';
import { LocalPorIdResolver } from './local-por-id.resolver';
import { LocalResolver } from './local.resolver';
import { MarcacaoExameDisponibilidadeResolver } from './marcacao-exame-disponibilidade.resolver';
import { MarcacaoExameDisponibilidadePorIdResolver } from './marcacao-exame-disponibilidade-por-id.resolver';
import { MarcacaoExameDisponibilidadeBloqueioPorIdResolver } from './marcacao-exame-disponibilidade-bloqueio-por-id.resolver';
import { MatriculaGestaoResolver } from './matricula-gestao.resolver';
import { MatriculaGestaoPorIdResolver } from './matricula-gestao-por-id.resolver';
import { ServicosGestaoResolver } from './servicos-gestao.resolver';
import { UnidadeDetranResolver } from './unidade-detran.resolver';
import { VeiculoCfcResolver } from './veiculo-cfc.resolver';
import { VeiculoResolver } from './veiculo.resolver';

export const GestaoResolvers = [
  CfcPorCnpjResolver,
  CfcResolver,
  InstrutorPorCpfResolver,
  InstrutorResolver,
  InstrutorCfcResolver,
  LocalPorIdResolver,
  LocalResolver,
  MarcacaoExameDisponibilidadeBloqueioPorIdResolver,
  MarcacaoExameDisponibilidadePorIdResolver,
  MarcacaoExameDisponibilidadeResolver,
  MarcacaoExamePorIdResolver,
  MatriculaGestaoPorIdResolver,
  MatriculaGestaoResolver,
  ServicosGestaoResolver,
  TipoExameResolver,
  UnidadeDetranResolver,
  VeiculoResolver,
  VeiculoCfcResolver
]
