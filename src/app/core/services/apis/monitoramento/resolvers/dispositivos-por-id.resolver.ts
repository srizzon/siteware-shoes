import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { DispositivoService } from '@services/apis/monitoramento/dispositivo.service';
import { DispositivoModel } from '@models/monitoramento/dispositivo.model';
import { UserControllerService } from '@services/outros/user-controller.service';

@Injectable({ providedIn: 'root' })
export class DispositivosPorIdResolver implements Resolve<Observable<DispositivoModel>> {

  constructor(
    private _service: DispositivoService,
    private _userControllerservice: UserControllerService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<DispositivoModel> {
    return this._service.buscarPorId(route.params.id);
    //return this._service.listarTodosPorCfc(this._userControllerservice.getUserLogged().cfc.id);
  }
}
