import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { TipoCreditoModel } from '@models/gestao/tipo-credito.model';
import { TipoCreditoService } from '@core/services/apis/financeiro/tipo-credito.service';
import { Toast } from '@services/outros/toast.service';

@Injectable({
  providedIn: 'root',
})
export class TipoCreditoResolver implements Resolve<Observable<TipoCreditoModel[]>> {

  constructor(
    private _service: TipoCreditoService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<TipoCreditoModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<TipoCreditoModel>())
        )
      )
  }
}
