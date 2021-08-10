import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { PlanoAulaService } from '@services/apis/monitoramento/plano-aula.service';
import { PlanoAulaModel } from '@models/monitoramento/plano-aula.model';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { UserControllerService } from '@services/outros/user-controller.service';

@Injectable({ providedIn: 'root' })
export class PlanoAulaPorCfcResolver implements Resolve<Observable<PlanoAulaModel[]>> {

  constructor(
    private _service: PlanoAulaService,
    private _userControllerservice: UserControllerService,
    private _servicesSubject: ServicesSubject
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PlanoAulaModel[]> {
    return this._service.listarTodosPorCfc(1);
    //return this._service.listarTodosPorCfc(this._userControllerservice.getUserLogged().cfc.id);
  }
}
