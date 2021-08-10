import { FaltaModel } from './falta.model';
export class EventoModel {
  dataHoraEvento?: any;
  faltaModel?: FaltaModel;
  id?: number;
  idAula?: number;
  idBehaviorInfraction?: number
  latitude?: string;
  longitude?: string;
  registroFoto?: string;
  tipoEventoCodigo?: string;

  constructor(options: EventoModel = { }) {
    this.dataHoraEvento = options.dataHoraEvento || null;
    this.faltaModel = options.faltaModel || null;
    this.id = options.id || null;
    this.idAula = options.idAula || null;
    this.idBehaviorInfraction = options.idBehaviorInfraction || null
    this.latitude = options.latitude || null;
    this.longitude = options.longitude || null;
    this.registroFoto = options.registroFoto || null;
    this.tipoEventoCodigo = options.tipoEventoCodigo || null;
  }
}
