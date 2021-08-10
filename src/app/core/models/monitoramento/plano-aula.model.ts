
export class PlanoAulaModel {
  ativo?: boolean;
  cfcModel?: CfcModel;
  conteudoModels?: ConteudoModel[];
  descricao?: string;
  id?: number;
  nome?: string;
  topicoModel?: TopicoModel;
  turno?: string;

  constructor(options: PlanoAulaModel = {}) {
    this.ativo = options.ativo || null;
    this.cfcModel = options.cfcModel || null;
    this.conteudoModels = options.conteudoModels || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.nome = options.nome || null;
    this.topicoModel = options.topicoModel || null;
    this.turno = options.turno || null;
  }
}

export class PlanoAulaRequestModel {
  cfcId?: number;
  descricao?: string;
  id?: number;
  nome?: string;
  topicoId?: number;
  turno?: string;

  constructor(options: PlanoAulaRequestModel = {}) {
    this.cfcId = options.cfcId || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.nome = options.nome || null;
    this.topicoId = options.topicoId || null;
    this.turno = options.turno || null;
  }
}

interface CfcModel {
  cnpj?: string;
  id?: number;
  nome?: string;
}

interface ConteudoModel {
  ativo?: boolean;
  codigo?: string;
  descricao?: string;
  id?: number;
  nome?: string
}

interface TopicoModel {
  ativo?: boolean;
  descricao?: string;
  id?: number;
  idCfc?: number;
}
