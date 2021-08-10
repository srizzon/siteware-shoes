export class VeiculoModel {
  ativo?: boolean;
  categoria?: string;
  dataAlteracao?: any;
  dataCadastro?: any;
  id?: number;
  placa?: string;
  usuarioAlteracao?: string;
  usuarioCadastro?: string;
  constructor(options: VeiculoModel = {}){
    this.ativo = options.ativo || null;
    this.categoria = options.categoria || null;
    this.dataAlteracao = options.dataAlteracao || null;
    this.dataCadastro = options.dataCadastro || null;
    this.id = options.id || null;
    this.placa = options.placa || null;
    this.usuarioAlteracao = options.usuarioAlteracao || null;
    this.usuarioCadastro = options.usuarioCadastro || null;
  }
}
