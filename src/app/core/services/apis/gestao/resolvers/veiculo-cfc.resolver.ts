import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { VeiculoCfcModel } from '@models/gestao/veiculo-cfc.model';
import { VeiculoCfcService } from '@services/apis/gestao/veiculo-cfc.service';
import { UserControllerService } from '@services/outros/user-controller.service';
import { Toast } from '@core/services/outros/toast.service';

@Injectable({
  providedIn: 'root',
})
export class VeiculoCfcResolver implements Resolve<Observable<VeiculoCfcModel[]>> {

  constructor(
    private _service: VeiculoCfcService,
    private _userService: UserControllerService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VeiculoCfcModel[]> {
    const user = this._userService.getUserLogged()
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<VeiculoCfcModel>())
        )
      )
  }
  /*   resolve(): Observable<VeiculoCfcModel[]> {
      const user = this._userService.getUserLogged()
      return this._service
        .getAll({cfcscnpj: user.organizationCNPJ})
        .pipe(
          map(res => res),
 catchError(
          () => of(new Array<VeiculoCfcModel>())
        )
        )
    } */
}
