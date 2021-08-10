import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { TipoDeLancamentoModel } from '@models/financeiro/tipo-de-lancamento.model';
import { TipoDeLancamentoService } from '@services/apis/financeiro/tipo-de-lancamento.service';
import { Toast } from '@core/services/outros/toast.service';

@Injectable({
  providedIn: 'root',
})
export class TipoDeLancamentoPorIdResolver implements Resolve<Observable<TipoDeLancamentoModel>> {

  constructor(
    private _service: TipoDeLancamentoService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<TipoDeLancamentoModel> {
    return this._service.getById(route.params.id);
  }
}
