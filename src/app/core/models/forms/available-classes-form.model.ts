import { CursoGestaoModel } from '@models/gestao/curso-gestao.model';
import { InstrutorModel } from '@models/gestao/instrutor.model';

export interface AvailableClassesForm {
  service: string;
  model: string;
  course: CursoGestaoModel;
  class: string;
  cfc: string;
  instructor: InstrutorModel;
  morning: string;
  evening: string;
  night: string;
}
