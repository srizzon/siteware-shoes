export class MarcacaoExameRequestModel {
  dataHora?: any;
  candidatoId?: number;
  exameId?: number;
  localExameId?: number;
  cfcId?: number;
  marcacaoDisponibilidadeId?: number;
  veiculoId?: number;
  matriculaId?: number;
  usuarioCadastro?: string;
  instrutorId?: number;
  idMarcacaoExame?: number;

  constructor(
    options: MarcacaoExameRequestModel = {}
  ) {
    this.candidatoId = options.candidatoId || null;
    this.cfcId = options.cfcId || null;
    this.dataHora = options.dataHora || null;
    this.exameId = options.exameId || null;
    this.localExameId = options.localExameId || null;
    this.matriculaId = options.matriculaId || null;
    this.marcacaoDisponibilidadeId = options.marcacaoDisponibilidadeId || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.veiculoId = options.veiculoId || null;
    this.instrutorId = options.instrutorId || null;
    this.idMarcacaoExame = options.idMarcacaoExame || null;
  }
}
