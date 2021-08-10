export class CargaRenachModel {
  ativo?: boolean;
  id?: number;
  candidato?: Candidato;
  candidatoCpf?: string;
  candidatoDataAniversario?: string;
  candidatoEmail?: string;
  candidatoId?: number;
  candidatoName?: string;
  candidatoTelefone?: string;
  cfcId?: number;
  cfcCnpj?: string;
  cfcNome?: string;
  dataAlteracao?: any;
  dataCadastro?: any;
  numero?: string;
  justificativaCancelamento?: string;
  observacao?: string;
  processo?: Processo;
  processoId?: number;
  status?: string;
  usuarioAlteracao?: string;
  usuarioCadastro?: string;

  constructor(options: CargaRenachModel = {}) {
    this.ativo = options.ativo || null;
    this.id = options.id || null;
    this.candidato = options.candidato || null;
    this.candidatoCpf = options.candidatoCpf || null;
    this.candidatoDataAniversario = options.candidatoDataAniversario || null;
    this.candidatoEmail = options.candidatoEmail || null;
    this.candidatoId = options.candidatoId || null;
    this.candidatoName = options.candidatoName || null;
    this.candidatoTelefone = options.candidatoTelefone || null;
    this.cfcId = options.cfcId || null;
    this.cfcCnpj = options.cfcCnpj || null;
    this.cfcNome = options.cfcNome || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.numero = options.numero || null;
    this.justificativaCancelamento = options.justificativaCancelamento || null;
    this.observacao = options.observacao || null;
    this.processo = options.processo || null;
    this.processoId = options.processoId || null;
    this.status = options.status || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
  }
}
interface Servico {
  ativo?: boolean;
  codigoExterno?: string;
  dataAlteracao?: any;
  dataCadastro?: any;
  id?: number;
  nome?: string;
  usuarioAlteracao?: string;
  usuarioCadastro?: string;
}

interface Candidato {
  cpf?: string;
  dataAniversario?: string;
  email?: string;
  id?: number;
  nome?: string;
  telefone?: string
}

interface CategoriaCnh {
  ativo?: boolean;
  categoria?: string;
  dataAlteracao?: any;
  dataCadastro?: any;
  id?: number;
  usuarioAlteracao?: string;
  usuarioCadastro?: string;
}

interface Processo {
  ativo?: boolean;
  candidatoId?: number;
  candidatoNome?: string;
  categoriaCnh?: CategoriaCnh;
  categoriaCnhId?: number;
  dataAberturaRenach?: any;
  dataCadastro?: any;
  dataVencimentoRenach?: any;
  id?: number;
  observacao?: string;
  renach?: string;
  situacao?: string;
  servico?: Servico;
  servicosId?: number;
  usuarioCadastro?: string;
}
