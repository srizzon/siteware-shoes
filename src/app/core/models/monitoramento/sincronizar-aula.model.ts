export class SincronizarAulaModel {
  dataEncerramentoAula?: any;
  distanciaPercorrida?: number;
  idAula?: number;
  latitudeEncerramento?: string;
  longitudeEncerramento?: string;
  possuiAlerta?: boolean;
  quantidadeAlertas?: number;

  constructor(options: SincronizarAulaModel = {}) {
    this.dataEncerramentoAula = options.dataEncerramentoAula || null;
    this.distanciaPercorrida = options.distanciaPercorrida || null;
    this.idAula = options.idAula || null;
    this.latitudeEncerramento = options.latitudeEncerramento || null;
    this.longitudeEncerramento = options.longitudeEncerramento || null;
    this.possuiAlerta = options.possuiAlerta || null;
    this.quantidadeAlertas = options.quantidadeAlertas || null;
  }
}
