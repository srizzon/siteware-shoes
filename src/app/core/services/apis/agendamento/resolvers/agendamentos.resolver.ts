import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { AgendamentoService } from '@services/apis/agendamento/agendamento.service';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosResolver implements Resolve<Observable<AgendamentoModel[]>> {

  constructor(
    private _service: AgendamentoService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<AgendamentoModel[]> {
    return this._service
      .getAll({id: route.params.id})
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<AgendamentoModel>())
        )
      )
  }
}
