import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { AulaMonitoramentoModel } from '@models/monitoramento/aula-monitoramento.model';
import { AulaMonitoramentoService } from '@services/apis/monitoramento/aula-monitoramento.service';

@Injectable({
  providedIn: 'root'
})
export class AulaMonitoramentoPorIdResolver implements Resolve<Observable<AulaMonitoramentoModel[]>> {

  constructor(
    private _service: AulaMonitoramentoService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<AulaMonitoramentoModel[]> {
    return this._service
      .getAll({ id: route.params.id })
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<AulaMonitoramentoModel>())
        )
      )
  }
}
