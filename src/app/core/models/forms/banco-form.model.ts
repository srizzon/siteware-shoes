import { CfcModel } from '@models/gestao/cfc.model';

export interface BankFormInterface {
  agencia: string;
  ativo: boolean;
  bancoId: number;
  clientId: string;
  cfc: CfcModel;
  conta: string;
  descricao: string;
  id: number;
  marketPlace: boolean;
  senhaIntegracao: string;
  usuarioIntegracao: string;
}
