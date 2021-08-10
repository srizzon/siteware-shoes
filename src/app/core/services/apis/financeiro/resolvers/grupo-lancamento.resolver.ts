import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { GrupoLancamentoModel } from '@models/financeiro/grupo-lancamento.model';
import { GrupoLancamentoService } from '@services/apis/financeiro/grupo-lancamento.service';

@Injectable({
  providedIn: 'root',
})
export class GrupoLancamentoResolver implements Resolve<Observable<GrupoLancamentoModel[]>> {

  constructor(
    private _service: GrupoLancamentoService,
  ) { }

  resolve(): Observable<GrupoLancamentoModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<GrupoLancamentoModel>())
        )
      )
  }
}
