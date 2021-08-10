export class CursoGestaoModel {
  id?: number;
  name?: string;
  nome?: string;
  quantidadeHorasBase?: number;
  codigoCursoExterno?: string;

  constructor(
    options: CursoGestaoModel = {}
  ) {
    this.id = options.id || null;
    this.name = options.name || null;
    this.quantidadeHorasBase = options.quantidadeHorasBase || null;
  }
}
