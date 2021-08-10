export class AlertaModel {
  dataCadastro?: any;
  descricao?: string;
  id?: number;
  registroFoto?: string;
  tipoAlerta?: string;

  constructor(options: AlertaModel = { }) {
    this.dataCadastro = options.dataCadastro || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.registroFoto = options.registroFoto || null;
    this.tipoAlerta = options.tipoAlerta || null;
  }
}
