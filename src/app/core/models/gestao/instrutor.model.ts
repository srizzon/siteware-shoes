export class InstrutorModel {
  ativo?: boolean;
  categoria?: string;
  cpf?: string;
  dataAlteracao?: any;
  dataCadastro?: any;
  email?: string;
  emailReuniao?: string;
  id?: number;
  idExterno?: string;
  idTipoInstrutor?: number;
  img_face?: string;
  nome?: string;
  telefone?: string;
  usuarioAtualizacao?: string;
  usuarioCadastro?: string;

  constructor(options:InstrutorModel = {}) {
    this.ativo = options.ativo || null;
    this.categoria = options.categoria || null;
    this.cpf = options.cpf || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.email = options.email || null;
    this.emailReuniao = options.emailReuniao || null;
    this.id = options.id || null;
    this.idExterno = options.idExterno || null;
    this.idTipoInstrutor = options.idTipoInstrutor || null;
    this.nome = options.nome || null;
    this.telefone = options.telefone || null;
    this.img_face = options.img_face || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
    this.usuarioAtualizacao = options.usuarioAtualizacao || null;
  }
}
