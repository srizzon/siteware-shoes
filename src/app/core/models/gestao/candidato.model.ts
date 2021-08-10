export class Candidato {
  id?: number;
  nome?: string;
  dataAniversario?: any;
  cpf?: string;
  email?: string;
  telefone?: string;
  img_face?: string;

  constructor(
    options: {
      id?: number;
      nome?: string;
      dataAniversario?: string;
      cpf?: string;
      email?: string;
      telefone?: string;
      img_face?: string;
    } = {}
  ) {
    this.id = options.id || null;
    this.nome = options.nome || null;
    this.dataAniversario = options.dataAniversario || null;
    this.cpf = options.cpf || null;
    this.email = options.email || null;
    this.telefone = options.telefone || null;
    this.img_face = options.img_face || null;
  }
}
