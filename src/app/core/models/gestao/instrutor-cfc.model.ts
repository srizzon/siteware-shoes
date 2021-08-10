export class InstrutorCfcModel {
  id?: number;
  instrutor?: Instrutor;
  cfc?: Cfc;

  constructor(options: InstrutorCfcModel = {}) {
    this.id = options.id || null;
    this.instrutor = options.instrutor || null;
    this.cfc = options.cfc || null;
  }
}

interface Instrutor {
  id?: number;
  idExterno?: string;
  idTipoInstrutor?: number;
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  usuarioCadastro?: string;
  dataCadastro?: any;
  usuarioAtualizacao?: string;
  dataAlteracao?: any;
  ativo?: boolean;
}

interface Cfc {
  id?: number;
  statusDetranId?: number;
  statusDetranDescricao?: string;
  statusDetranCodDetran?: string;
  unidadeDetranId?: number;
  unidadeDetranDescricao?: string;
  codCfcDetran?: number;
  codFilialDetran?: string;
  dataValidade?: any;
  associado?: boolean;
  matriz?: boolean;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  nome?: string;
  logradouro?: string;
  complemento?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  emailContato?: string;
  emailFaturamento?: string;
  telefone?: string;
  usuarioReuniaoOnline?: string;
  dataCadastro?: any;
  usuarioCadastro?: string;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  ativo?: boolean;
  processo?: string;
  dataDiario?: any;
  portaria?: string;
  classificacao?: number;
  longitude?: number;
  latitude?: number;
}
