import { CfcModel } from './../gestao/cfc.model';
export class UserLoginModel {
  access_token?: string;
  associado?: boolean;
  date_token_expire?: any;
  expires_in?: string;
  id?: string;
  jti?: string;
  marcacaoExame?: boolean;
  name?: string;
  organizationCNPJ?: string;
  organizationCidade?: string;
  organizationEstado?: string;
  organizationNome?: string;
  refresh_token?: string;
  relatorioMarcacao?: boolean;
  scope?: string;
  token_type?: string;
  type?: string;
  userName?: string;
  cfc?: CfcModel;

  constructor(options: UserLoginModel = {}) {
    this.access_token = options.access_token || null;
    this.associado = options.associado || null;
    this.cfc = options.cfc || null;
    this.date_token_expire = options.date_token_expire || null;
    this.expires_in = options.expires_in || null;
    this.id = options.id || null;
    this.jti = options.jti || null;
    this.marcacaoExame = options.marcacaoExame || null;
    this.name = options.name || null;
    this.organizationCNPJ = options.organizationCNPJ || null;
    this.organizationCidade = options.organizationCidade || null;
    this.organizationEstado = options.organizationEstado || null;
    this.organizationNome = options.organizationNome || null;
    this.refresh_token = options.refresh_token || null;
    this.relatorioMarcacao = options.relatorioMarcacao || null;
    this.scope = options.scope || null;
    this.token_type = options.token_type || null;
    this.type = options.type || null;
    this.userName = options.userName || null;
  }
}
