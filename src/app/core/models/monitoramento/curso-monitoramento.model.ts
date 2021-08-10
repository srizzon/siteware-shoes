import { PlanoAulaModel } from './plano-aula.model';
export class CursoMonitoramentoModel {

  ativo?: boolean;
  descricao?: string;
  id?: number;
  idCfc?: number;
  nome?: string;
  padrao?: boolean;
  tipoCurso?: string;
  planoAulaModelList?: PlanoAulaModel[];

  constructor(options: CursoMonitoramentoModel = { }) {
    this.ativo = options.ativo || null;
    this.descricao = options.descricao || null;
    this.id = options.id || null;
    this.idCfc = options.idCfc || null;
    this.nome = options.nome || null;
    this.padrao = options.padrao || null;
    this.tipoCurso = options.tipoCurso || null;
    this.planoAulaModelList = options.planoAulaModelList || [];
  }
}
