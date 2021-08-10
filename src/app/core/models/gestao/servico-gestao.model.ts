export class ServicoGestaoModel {
  id?: number;
  name?: string;
  nome?: string;
  codigoExterno?: number;

  constructor(
    options: ServicoGestaoModel = {}
  ) {
    this.id = options.id || null;
    this.name = options.name || null;
    this.nome = options.nome || null;
  }
}
