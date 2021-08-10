export class BancoModel {
  id?: number;
  descricao?: string;
  codigoBanco?: string;

  constructor(options: BancoModel = {}) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.codigoBanco = options.codigoBanco || null;
  }
}
