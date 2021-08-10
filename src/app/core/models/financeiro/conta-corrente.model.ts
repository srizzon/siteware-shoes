export class ContaCorrenteModel {
  agencia?: string;
  ativo?: true;
  banco?: {
    id?: number;
    descricao?: string;
    codigoBanco?: string;
  }
  bancoId?: number;
  clientId?: string;
  cnpjEmpresa?: string;
  conta?: string;
  dataAlteracao?: any;
  dataCadastro?: any;
  descricao?: string;
  id?: number;
  marketPlace?: boolean;
  saldo?: number;
  saldoInicial?: number;
  sandBox?: true;
  senhaIntegracao?: string;
  usuarioIntegracao?: string;
  usuarioCadastro?: string;
  usuarioAlteracao?: string;

  constructor(options: ContaCorrenteModel = { }) {
    this.agencia = options.agencia || null;
    this.ativo = options.ativo || null;
    this.banco = options.banco || null;
    this.bancoId = options.bancoId || null;
    this.clientId = options.clientId || null;
    this.cnpjEmpresa = options.cnpjEmpresa || null;
    this.conta = options.conta || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.marketPlace = options.marketPlace || false;
    this.saldo = options.saldo || null;
    this.saldoInicial = options.saldoInicial || null;
    this.sandBox = options.sandBox || null;
    this.senhaIntegracao = options.senhaIntegracao || null;
    this.usuarioIntegracao = options.usuarioIntegracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
  }
}
