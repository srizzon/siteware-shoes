export class CfcFormModel {
  id?: number;
  name?: string;
  cnpj?: string;
  user?: string;
  situation?: string;

  constructor(
    options: {
      id?: number;
      name?: string;
      cnpj?: string;
      user?: string;
      situation?: string;
    } = {}
  ) {
    this.id = options.id || null;
    this.name = options.name || null;
    this.cnpj = options.cnpj || null;
    this.user = options.user || null;
    this.situation = options.situation || null;
  }
}
