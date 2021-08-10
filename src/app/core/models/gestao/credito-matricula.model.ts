import { TipoCreditoModel } from './tipo-credito.model'

export class CreditoMatricula {
  id?: number;
  tipoCreditoId?: number;
  matriculaId?: number;
  quantidade?: number;
  ativo?: boolean;
  usuarioCadastro?: string;
  dataCadastro?: any;
  usuarioAlteracao?: string;
  dataAlteracao?: any;
  tipoCredito?: TipoCreditoModel

  constructor(options: CreditoMatricula = {}) {
    this.id = options.id || null;
    this.tipoCreditoId = options.tipoCreditoId || null;
    this.matriculaId = options.matriculaId || null;
    this.quantidade = options.quantidade || null;
    this.ativo = options.ativo || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.dataCadastro = options.dataCadastro || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.tipoCredito = options.tipoCredito || null;
  }
}
