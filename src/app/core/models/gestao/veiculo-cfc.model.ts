export class VeiculoCfcModel {
  id?: number;
  veiculo?: Veiculo;
  cfc?: Cfc;

  constructor(
    options: VeiculoCfcModel = {}
  ) {
    this.id = options.id || null;
    this.veiculo = options.veiculo || null;
    this.cfc = options.cfc || null;
  }
}

interface Veiculo {
  id?: number;
  placa?: string;
  categoria?: string;
  dataCadastro?: any;
  usuarioCadastro?: string;
  dataAlteracao?: any;
  usuarioAlteracao?: string;
  ativo?: boolean;
}

interface Cfc  {
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
