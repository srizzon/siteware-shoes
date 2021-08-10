export class GradeServicoModel {
  ativo: boolean;
  descricao: string;
  id: number;
  servicoId: number;
  servicoName: string;
  qtdDiasPrevistoConclusao: number;
  turno: string;
  codServicoExterno: number;

  constructor(
    options: {
      id?: number;
      descricao?: string;
      ativo?: boolean;
      servicoId?: number;
      servicoName?: string;
      qtdDiasPrevistoConclusao?: number;
      turno?: string;
    } = {}
  ) {
    this.id = options.id || null;
    this.descricao = options.descricao || null;
    this.ativo = options.ativo || null;
    this.servicoId = options.servicoId || null;
    this.servicoName = options.servicoName || null;
    this.qtdDiasPrevistoConclusao = options.qtdDiasPrevistoConclusao || null;
    this.turno = options.turno || null;
  }
}
