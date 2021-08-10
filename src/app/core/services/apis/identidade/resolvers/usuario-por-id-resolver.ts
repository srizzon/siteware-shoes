import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { UsuarioIdentidadeModel } from '@models/identidade/usuario-identidade.model';
import { UsuarioService } from '@services/apis/identidade/usuario.service';

@Injectable({ providedIn: 'root' })
export class UsuarioPorIdResolver implements Resolve<Observable<UsuarioIdentidadeModel>> {

  constructor(
    private _service: UsuarioService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<UsuarioIdentidadeModel> {
    return this._service.getById(route.params.id);
  }
}
