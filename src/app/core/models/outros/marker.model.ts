import { AulaMonitoramentoModel } from '@models/monitoramento/aula-monitoramento.model';
import { EventoModel } from '@models/monitoramento/evento.model';

export class MarkerModel {
  icon?: {
    url?: string;
    scaledSize?: {
      width?: number;
      height?: number;
    }
  };
  data?: EventoModel | AulaMonitoramentoModel | any;
  occurrency?: number;
  draggable?: boolean;
  animation?: string;

  constructor(options: MarkerModel = { }) {
    this.icon = options.icon || null;
    this.data = options.data || null;
    this.occurrency = options.occurrency || null;
    this.draggable = options.draggable || null;
    this.animation = options.animation || null;
  }
}
