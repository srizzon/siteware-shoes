import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ContratoFinanceiroService } from '@services/apis/financeiro/contrato-financeiro.service';
import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { UserControllerService } from '@services/outros/user-controller.service';

@Injectable({
  providedIn: 'root'
})
export class ContratosResolver implements Resolve<Observable<ContratoFinanceiroModel[]>> {

  constructor(
    private _service: ContratoFinanceiroService,
    private _userControllerservice: UserControllerService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ContratoFinanceiroModel[]> {
    const params = {
      cnpj: this._userControllerservice.getUserLogged().organizationCNPJ,
      matriculaId: route.params.id,
    };
    return this._service
      .getAll(params)
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<ContratoFinanceiroModel>())
        )
      )
  }
}
