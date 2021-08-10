import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { PlanoAulaService } from '@services/apis/monitoramento/plano-aula.service';
import { PlanoAulaModel } from '@models/monitoramento/plano-aula.model';

@Injectable({ providedIn: 'root' })
export class PlanoAulaPorIdResolver implements Resolve<Observable<PlanoAulaModel>> {

  constructor(
    private _service: PlanoAulaService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PlanoAulaModel> {
    return this._service.buscarPorId(route.params.id);
  }
}
