import { Venda } from '@models/financeiro/venda-model';
export class SalesDialog {
  title?: string;
  product?: string;
  value?: number;
  credits?: string;
  candidate?: string;
  venda?: Venda;

  constructor(
    options: {
        title?: string;
        product?: string;
        value?: number;
        credits?: string;
        candidate?: string;
        venda?: Venda;
    }= {}
  )  {
    this.title = options.title || null;
    this.product = options.product || null;
    this.value = options.value || null;
    this.credits = options.credits || null;
    this.candidate = options.candidate || null;
    this.venda = options.venda || null;
  }
}
