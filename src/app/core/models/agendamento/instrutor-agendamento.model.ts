export class InstrutorAgendamentoModel {
  id?: number;
  instrutorId?: number;
  instrutorNome?: string;
  instrutorCpf?: string;
  cfcId?: number;
  cfcNome?: string;
  cfcCnpj?: string;

  constructor(options: InstrutorAgendamentoModel = {}) {
    this.id = options.id || null;
    this.instrutorId = options.instrutorId || null;
    this.instrutorNome = options.instrutorNome || null;
    this.instrutorCpf = options.instrutorCpf || null;
    this.cfcId = options.cfcId || null;
    this.cfcNome = options.cfcNome || null;
    this.cfcCnpj = options.cfcCnpj || null;
  }
}
