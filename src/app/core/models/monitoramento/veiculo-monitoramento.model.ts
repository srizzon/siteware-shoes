export class VeiculoMonitoramentoModel {
  ano?: string;
  id?: number;
  modelo?: string;
  placa?: string;

  constructor(options: VeiculoMonitoramentoModel = {}) {
    this.ano = options.ano || null;
    this.id = options.id || null;
    this.modelo = options.modelo || null;
    this.placa = options.placa || null;
  }
}
