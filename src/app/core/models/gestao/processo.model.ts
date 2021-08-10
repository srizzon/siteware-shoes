import { Category } from './../outros/category.model';
import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';

export class Processo {
  id?: number;
  candidatoId?: number;
  situacao?: string;
  renach?: string;
  observacao?: string;
  candidatoNome?: string;
  servicosId?: string;
  servico: ServicoGestaoModel;
  categoriaCnh: Category;
  dataAberturaRenach: any;
  dataVencimentoRenach: any;

  constructor(
    options: {
      id?: number;
      candidatoId?: number;
      situacao?: string;
      renach?: string;
      servicosId?: string;
    } = {}
  ) {
    this.id = options.id || null;
    this.situacao = options.situacao || null;
    this.renach = options.renach || null;
    this.servicosId = options.servicosId || null;
  }
}
