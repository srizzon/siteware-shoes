export class ProductCreditType {
    id: number;
    descricao: string;
  
    constructor(
      options: {
        id?: number;
        descricao?: string;
      } = {}
    ) {
      this.id = options.id || null;
      this.descricao = options.descricao || null;
    }
  }
    