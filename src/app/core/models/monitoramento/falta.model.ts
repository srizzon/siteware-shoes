export class FaltaModel {
  artigo?: string;
  codigoFalta?: string;
  descricao?: string;
  idBehaviorInfraction?: 0;
  nivelSeveridade?: string;
  tipoFalta?: string;

  constructor(options: FaltaModel = {}) {
    this.artigo = options.artigo || null;
    this.codigoFalta = options.codigoFalta || null;
    this.descricao = options.descricao || null;
    this.idBehaviorInfraction = options.idBehaviorInfraction || null;
    this.nivelSeveridade = options.nivelSeveridade || null;
    this.tipoFalta = options.tipoFalta || null;
  }
}
