import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ConteudoModel } from '@models/monitoramento/conteudo.model';
import { ConteudoService } from '@services/apis/monitoramento/conteudo.service';

@Injectable({ providedIn: 'root' })
export class ConteudoPorIdResolver implements Resolve<Observable<ConteudoModel>> {

  constructor(
    private _service: ConteudoService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ConteudoModel> {
    return this._service.buscarPorId(route.params.id);;
  }
}
