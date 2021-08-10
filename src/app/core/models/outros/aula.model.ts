export class AulaModel {
  id?: number;
  idExterno?: any;
  conteudoProgramatico?: any;
  inicio?: any;
  fim?: any;
  intervalo?: any;
  numeroAula?: any;
  cursoId?: number;

  constructor(options: AulaModel = {}) {
    this.id = options.id || null;
    this.idExterno = options.idExterno || '';
    this.conteudoProgramatico = options.conteudoProgramatico || null;
    this.cursoId = options.cursoId || null;
    this.inicio = options.inicio || null;
    this.fim = options.fim || null;
    this.intervalo = options.intervalo || null;
    this.numeroAula = options.numeroAula || null;
  }
}
