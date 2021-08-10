export class MatriculaGestaoModel {
  id?: number;
  candidatoId?: number;
  processoId?: number;
  candidatoName?: string;
  candidatoCpf?: string;
  candidatoTelefone?: string;
  candidatoEmail?: string;
  candidatoDataAniversario?: any;
  cfcId?: number;
  cfcNome?: string;
  numero?: string;
  observacao?: string;
  status?: string;
  justificativaCancelamento?: string;
  ativo?: boolean;
  usuarioCadastro?: string;
  dataCadastro?: any;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  processo?: Processo;
  candidato?: Candidato;
  situacaoProcessoAbert?: string;
  renachProcessoAtual?: string;
  servicoProcessoAtual?: string;
  categoriaProcessoAtual?: string;

  constructor(options: MatriculaGestaoModel = {}) {
    this.id = options.id || null;
    this.candidatoId = options.candidatoId || null;
    this.processoId = options.processoId || null;
    this.candidatoName = options.candidatoName || null;
    this.candidatoCpf = options.candidatoCpf || null;
    this.candidatoTelefone = options.candidatoTelefone || null;
    this.candidatoEmail = options.candidatoEmail || null;
    this.candidatoDataAniversario = options.candidatoDataAniversario || null;
    this.cfcId = options.cfcId || null;
    this.cfcNome = options.cfcNome || null;
    this.numero = options.numero || null;
    this.observacao = options.observacao || null;
    this.status = options.status || null;
    this.justificativaCancelamento = options.justificativaCancelamento || null;
    this.ativo = options.ativo || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.processo = options.processo || null;
    this.candidato = options.candidato || null;
  }
}

interface Processo {
  id?: number;
  candidatoId?: number;
  renach?: string;
  situacao?: string;
  servicosId?: number;
  categoriaCnhId?: number;
  dataAberturaRenach?: any;
  dataVencimentoRenach?: any;
  usuarioCadastro?: string;
  dataCadastro?: any;
  ativo?: true;
  servico?: Servico;
  categoriaCnh?: CategoriaCnh;
  observacao?: string;
}

interface Servico {
  id?: number;
  nome?: string;
  ativo?: boolean;
  codigoExterno?: string;
  usuarioCadastro?: string;
  dataCadastro?: any;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
}

interface CategoriaCnh {
  id?: number;
  categoria?: string;
  ativo?: boolean;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  usuarioCadastro?: string;
  dataCadastro?: any;
}

interface Candidato {
  id?: number;
  nome?: string;
  dataAniversario?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  img_face?: string
}
export class MatriculaRequest {
  id?: number;
  cnpj?: string;
  cpf?: string;
  email?: string;
  dataAniversario?: any;
  nomeCandidato?: string;
  telefone?: string;
  observacao?: string;

  constructor(
    options: MatriculaRequest = {}
  ) {
    this.id = options.id || null;
    this.cnpj = options.cnpj || null;
    this.cpf = options.cpf || null;
    this.email = options.email || null;
    this.dataAniversario = options.dataAniversario || null;
    this.nomeCandidato = options.nomeCandidato || null;
    this.telefone = options.telefone || null;
    this.observacao = options.observacao
  }
}
