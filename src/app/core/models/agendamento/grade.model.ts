export class GradeModel {
  cfcCnpj?: string;
  cfcId?: number;
  cfcNome?: string;
  dataInicio?: any;
  dataInicioRealizado?: any;
  dataTermino?: any;
  dataTerminoRealizado?: any;
  descricao?: string;
  gradeServicoDescricao?: string;
  gradeServicoId?: number;
  gradeServicoQtdDiasPrevistoConclusao?: number;
  gradeServicoServicoId?: number;
  gradeServicoservicoDescricao?: string;
  id?: number;
  indicadorDiasUteis?: boolean;
  instrutorCpf?: string;
  instrutorId?: number;
  instrutorNome?: string;
  modelo?: any;
  qtdMaximoParticipantes?: number;
  qtdVagasDisponiveis?: number;
  servicoDescricao?: string;
  servicoId?: number;
  situacao?: any;
  turno?: string;

  constructor(
    options: GradeModel = {}
  ) {

  this.cfcCnpj = options.cfcCnpj || null;
  this.cfcId = options.cfcId || null;
  this.cfcNome = options.cfcNome || null;
  this.dataInicio = options.dataInicio || null;
  this.dataInicioRealizado = options.dataInicioRealizado || null;
  this.dataTermino = options.dataTermino || null;
  this.dataTerminoRealizado = options.dataTerminoRealizado || null;
  this.descricao = options.descricao || null;
  this.gradeServicoDescricao = options.gradeServicoDescricao || null;
  this.gradeServicoId = options.gradeServicoId || null;
  this.gradeServicoQtdDiasPrevistoConclusao = options.gradeServicoQtdDiasPrevistoConclusao || null;
  this.gradeServicoServicoId = options.gradeServicoServicoId || null;
  this.gradeServicoservicoDescricao = options.gradeServicoservicoDescricao || null;
  this.id = options.id || null;
  this.indicadorDiasUteis = options.indicadorDiasUteis || null;
  this.instrutorCpf = options.instrutorCpf || null;
  this.instrutorId = options.instrutorId || null;
  this.instrutorNome = options.instrutorNome || null;
  this.modelo = options.modelo || null;
  this.qtdMaximoParticipantes = options.qtdMaximoParticipantes || null;
  this.qtdVagasDisponiveis = options.qtdVagasDisponiveis || null;
  this.servicoDescricao = options.servicoDescricao || null;
  this.servicoId = options.servicoId || null;
  this.situacao = options.situacao || null;
  this.turno = options.turno || null;
  }
}
