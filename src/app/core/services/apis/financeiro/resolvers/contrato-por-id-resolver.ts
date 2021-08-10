import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { ContratoFinanceiroService } from '../contrato-financeiro.service';

@Injectable({ providedIn: 'root' })
export class ContratoPorIdResolver implements Resolve<Observable<ContratoFinanceiroModel>> {

  constructor(
    private _service: ContratoFinanceiroService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ContratoFinanceiroModel> {
    return this._service
      .getById(route.params.id)
      .pipe(
        map(res => res),
        catchError(
          () => of(new ContratoFinanceiroModel())
        )
      )
  }
}
