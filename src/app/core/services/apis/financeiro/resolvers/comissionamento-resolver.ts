import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ComissionamentoModel } from '@models/financeiro/comissionamento.model';
import { ComissionamentoService } from '@services/apis/financeiro/comissionamento.service';

@Injectable({
  providedIn: 'root',
})
export class ComissionamentosResolver implements Resolve<Observable<ComissionamentoModel[]>> {

  constructor(
    private _service: ComissionamentoService
  ) { }

  resolve(): Observable<ComissionamentoModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<ComissionamentoModel>())
        )
      )
  }
}
