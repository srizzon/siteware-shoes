import { VeiculoService } from './../veiculo.service';
import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { VeiculoCfcModel } from '@models/gestao/veiculo-cfc.model';
import { VeiculoCfcService } from '@services/apis/gestao/veiculo-cfc.service';
import { UserControllerService } from '@services/outros/user-controller.service';
import { Toast } from '@core/services/outros/toast.service';
import { VeiculoModel } from '@core/models/gestao/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculoResolver implements Resolve<Observable<VeiculoModel[]>> {

  constructor(
    private _service: VeiculoService,
    private _userService: UserControllerService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VeiculoModel[]> {
    const user = this._userService.getUserLogged()
    let payload = null;
    if (route.params.id) {
      payload = {id: route.params.id}
    }
    return this._service
      .getAll(payload)
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<VeiculoModel>())
        )
      )
  }
}
