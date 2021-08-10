import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ComissionamentoModel } from '@models/financeiro/comissionamento.model';
import { ComissionamentoService } from '@services/apis/financeiro/comissionamento.service';

@Injectable({
  providedIn: 'root',
})
export class ComissionamentosPorIdResolver implements Resolve<Observable<ComissionamentoModel[]>> {

  constructor(
    private _service: ComissionamentoService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ComissionamentoModel[]> {
    return this._service.getAll({ id: route.params.id })
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<ComissionamentoModel>())
        )
      )
  }
}
