export class Usuario {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  type?: string;
  active?: boolean;

  constructor(
    options: Usuario = {}
  ) {
    this.id = options.id || null;
    this.name = options.name || null;
    this.username = options.username || null;
    this.email = options.email || null;
    this.type = options.type || null;
    this.active = options.active || null;
  }
}
