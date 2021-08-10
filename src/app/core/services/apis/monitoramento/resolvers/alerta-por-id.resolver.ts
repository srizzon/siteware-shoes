import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AlertaService } from '@services/apis/monitoramento/alerta.service';
import { AlertaModel } from '@models/monitoramento/alerta.model';

@Injectable({ providedIn: 'root' })
export class AlertaPorIdResolver implements Resolve<Observable<AlertaModel[]>> {

  constructor(
    private _service: AlertaService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<AlertaModel[]> {
    return this._service.listarAlertasPorAula(route.params.id);
  }
}
