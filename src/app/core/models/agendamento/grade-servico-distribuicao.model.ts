import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';
import { CursoGestaoModel } from '@models/gestao/curso-gestao.model';

export class GradeServicoDistribuicaoModel {
    id?: number;
    numeroAula?: number;
    horaInicio?: string;
    horaTermino?: string;
    turno?: string;
    curso?: CursoGestaoModel;
    gradeServico?: {};
    servico?: ServicoGestaoModel;
    servicoNome?: string;
    cursoNome?: string;

    constructor(options: GradeServicoDistribuicaoModel = {}) {
      this.id = options.id || null;
      this.numeroAula = options.numeroAula || null;
      this.horaInicio = options.horaInicio || null;
      this.horaTermino = options.horaTermino || null;
      this.turno = options.turno || null;
      this.curso = options.curso || null;
      this.gradeServico = options.gradeServico || null;
      this.servico = options.servico || null;
      this.servicoNome = options.servicoNome || null;
      this.cursoNome = options.cursoNome || null;
    }
  }
