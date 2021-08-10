import { TopicoModel } from './topico.model';
import { ConteudoModel } from './conteudo.model';
import { VeiculoMonitoramentoModel } from './veiculo-monitoramento.model';

export class AulaMonitoramentoModel {
  candidatoModel?: CandidatoInterface;
  cfcModel?: CfcInterface;
  dataCadastro?: any;
  dataEncerramentoAula?: any;
  dataFimAgenda?: any;
  dataInicioAgenda?: any;
  dataInicioAula?: any;
  descricaoServico?: string;
  dispositivoModel?: DispositivoInterface;
  distanciaPercorrida?: number;
  duracaoAula?: number;
  id?: number;
  idAgendamento?: number;
  instrutorModel?: InstrutorInterface;
  numeroMatricula?: string;
  planoAulaModel?: PlanoAulaInterface
  possuiAlerta?: boolean;
  processo?: string;
  quantidadeAlertas?: number;
  quantidadeFaltas?: number;
  quantidadeFaltasGraves?: number;
  quantidadeFaltasGravissimas?: number;
  quantidadeFaltasLeves?: number;
  quantidadeFaltasMedias?: number;
  situacaoAula?: string;
  tempoDeAula?: any;
  ultimaLocalizacaoLatitude?: string;
  ultimaLocalizacaoLongitude?: string;
  veiculoModel?: VeiculoMonitoramentoModel;

  constructor(options: AulaMonitoramentoModel = {}) {
    this.candidatoModel = options.candidatoModel || null;
    this.cfcModel = options.cfcModel || null;
    this.dataCadastro = options.dataCadastro || null;
    this.dataEncerramentoAula = options.dataEncerramentoAula || null;
    this.dataFimAgenda = options.dataFimAgenda || null;
    this.dataInicioAgenda = options.dataInicioAgenda || null;
    this.dataInicioAula = options.dataInicioAula || null;
    this.descricaoServico = options.descricaoServico || null;
    this.dispositivoModel = options.dispositivoModel || null;
    this.distanciaPercorrida = options.distanciaPercorrida || null;
    this.duracaoAula = options.duracaoAula || null;
    this.id = options.id || null;
    this.idAgendamento = options.idAgendamento || null;
    this.instrutorModel = options.instrutorModel || null;
    this.numeroMatricula = options.numeroMatricula || null;
    this.planoAulaModel = options.planoAulaModel || null
    this.possuiAlerta = options.possuiAlerta || null;
    this.processo = options.processo || null;
    this.quantidadeAlertas = options.quantidadeAlertas || null;
    this.quantidadeFaltas = options.quantidadeFaltas || null;
    this.quantidadeFaltasGraves = options.quantidadeFaltasGraves || null;
    this.quantidadeFaltasGravissimas = options.quantidadeFaltasGravissimas || null;
    this.quantidadeFaltasLeves = options.quantidadeFaltasLeves || null;
    this.quantidadeFaltasMedias = options.quantidadeFaltasMedias || null;
    this.situacaoAula = options.situacaoAula || null;
    this.tempoDeAula = options.tempoDeAula || null;
    this.ultimaLocalizacaoLatitude = options.ultimaLocalizacaoLatitude || null;
    this.ultimaLocalizacaoLongitude = options.ultimaLocalizacaoLongitude || null;
    this.veiculoModel = options.veiculoModel || null;
  }
}

interface CandidatoInterface {
  cpf?: string;
  nome?: string;
  imgFace?: string;
}

interface CfcInterface {
  cnpj?: string;
  id?: number;
  nome?: string;
}

interface DispositivoInterface {
  id?: number;
  identificador?: string;
  modelo?: string;
  situacaoDispositivo?: string;
}

interface InstrutorInterface {
  cpf?: string;
  nome?: string;
  imgFace?: string;
}

interface PlanoAulaInterface {
  ativo?: true,
  cfcModel?: CfcInterface;
  conteudoModels?: ConteudoModel[];
  descricao?: string;
  id?: number;
  nome?: string;
  topicoModel?: TopicoModel;
  turno?: string;
}

