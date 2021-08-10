import { IdentidadeResolver } from './resolvers/_identidade-resolvers';
import { UsuarioService } from '@services/apis/identidade/usuario.service';

export const ItendidateServices = [
  UsuarioService,
  IdentidadeResolver
]
