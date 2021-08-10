export class UsuarioIdentidadeModel {
  active?: boolean;
  createdByUsername?: string;
  creationDate?: any;
  email?: string;
  id?: string;
  modificationDate?: any;
  name?: string;
  organizationCNPJ?: string;
  type?: string;
  updatedByUsername?: string;
  username?: string;

  constructor(options: UsuarioIdentidadeModel = {}) {
    this.active = options.active || false;
    this.createdByUsername = options.createdByUsername || null;
    this.creationDate = options.creationDate || null;
    this.email = options.email || null;
    this.id = options.id || null;
    this.modificationDate = options.modificationDate || null;
    this.name = options.name || null;
    this.organizationCNPJ = options.organizationCNPJ || null;
    this.type = options.type || null;
    this.updatedByUsername = options.updatedByUsername || null;
    this.username = options.username || null;
  }
}
