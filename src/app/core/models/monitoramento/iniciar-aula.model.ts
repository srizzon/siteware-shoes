import { DispositivoModel } from './dispositivo.model';
import { VeiculoMonitoramentoModel } from './veiculo-monitoramento.model';

export class IniciarAulaModel {
  dispositivoModel?: DispositivoModel;
  idAgendamento?: number;
  idPlanoAula?: number;
  kmInicial?: number;
  veiculoModel?: VeiculoMonitoramentoModel

  constructor(options: IniciarAulaModel = {}) {
    this.dispositivoModel = options.dispositivoModel || null;
    this.idAgendamento = options.idAgendamento || null;
    this.idPlanoAula = options.idPlanoAula || null;
    this.kmInicial = options.kmInicial || null;
    this.veiculoModel = options.veiculoModel || null;}
}
