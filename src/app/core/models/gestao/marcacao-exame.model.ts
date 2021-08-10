export class MarcacaoExameModel {
  ativo?: boolean;
  candidatoCpf?: string;
  candidatoId?: number;
  candidatoNome?: string;
  candidatoNomeSplit?: string;
  cfcId?: number;
  cfcNome?: string;
  comentario?: string;
  dataCadastro?: any;
  dataHora?: any;
  exameDescricao?: string;
  exameId?: number;
  id?: number;
  instrutorId?: any;
  instrutorNome?: any;
  instrutorNomeSplit?: any;
  localDescricao?: string;
  localId?: number;
  marcacaoDisponibilidadeId?: number;
  matriculaId?: number;
  matriculaNumero?: string;
  matriculaProcessoRenach?: string;
  retorno?: string;
  sincronizado?: boolean;
  situacao?: string;
  usuarioCadastro?: string;
  veiculoCategoria?: any;
  veiculoId?: any;
  veiculoPlaca?: any;

  constructor(
    options: MarcacaoExameModel = {}
  ) {
  this.ativo = options.ativo || null;
  this.candidatoCpf = options.candidatoCpf || null;
  this.candidatoId = options.candidatoId || null;
  this.candidatoNome = options.candidatoNome || null;
  this.candidatoNomeSplit = options.candidatoNomeSplit || null;
  this.cfcId = options.cfcId || null;
  this.cfcNome = options.cfcNome || null;
  this.comentario = options.comentario || null;
  this.dataCadastro = options.dataCadastro || null;
  this.dataHora = options.dataHora || null;
  this.exameDescricao = options.exameDescricao || null;
  this.exameId = options.exameId || null;
  this.id = options.id || null;
  this.instrutorId = options.instrutorId || null;
  this.instrutorNome = options.instrutorNome || null;
  this.instrutorNomeSplit = options.instrutorNomeSplit || null;
  this.localDescricao = options.localDescricao || null;
  this.localId = options.localId || null;
  this.marcacaoDisponibilidadeId = options.marcacaoDisponibilidadeId || null;
  this.matriculaId = options.matriculaId || null;
  this.matriculaNumero = options.matriculaNumero || null;
  this.matriculaProcessoRenach = options.matriculaProcessoRenach || null;
  this.retorno = options.retorno || null;
  this.sincronizado = options.sincronizado || null;
  this.situacao = options.situacao || null;
  this.usuarioCadastro = options.usuarioCadastro || null;
  this.veiculoCategoria = options.veiculoCategoria || null;
  this.veiculoId = options.veiculoId || null;
  this.veiculoPlaca = options.veiculoPlaca || null;
  }
}
