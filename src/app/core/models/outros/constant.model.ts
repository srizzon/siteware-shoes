export class ConstantModel {
  id?: any;
  descricao?: string;
  enum?: string;

  constructor(options: ConstantModel = {}) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.enum = options.enum || null;
  }
}
