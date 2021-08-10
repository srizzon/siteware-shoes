export class DistribuicaoModel {
  inicio?: string;
  fim?: string;
  posicao?: number;

  constructor(options: DistribuicaoModel = {}) {
    this.inicio = options.inicio || null;
    this.fim = options.fim || null;
    this.posicao = options.posicao || null;
  }
}
