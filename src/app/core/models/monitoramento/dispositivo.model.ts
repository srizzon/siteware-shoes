export class DispositivoModel {
  id?: number;
  idCfc?: number;
  identificador?: string;
  modelo?: string;
  situacaoDispositivo?: string;
  ativo?: boolean;

  constructor(options: DispositivoModel = {}) {
    this.id = options.id || null;
    this.idCfc = options.idCfc || null;
    this.identificador = options.identificador || null;
    this.modelo = options.modelo || null;
    this.situacaoDispositivo = options.situacaoDispositivo || null;
    this.ativo = options.ativo || null;
  }
}
