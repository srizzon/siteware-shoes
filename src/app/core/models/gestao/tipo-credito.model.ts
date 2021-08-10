export class TipoCreditoModel {
    id?: number;
    ativo?: boolean;
    descricao?: string;
    usuarioCadastro?: string;
    dataCadastro?: any
  
    constructor(options: TipoCreditoModel = {}) {
      this.id = options.id || null;
      this.ativo = options.ativo || null;
      this.descricao = options.descricao || null;
      this.usuarioCadastro = options.usuarioCadastro || null;
      this.dataCadastro = options.dataCadastro || null;
    }
}