import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CursoMonitoramentoModel } from '@models/monitoramento/curso-monitoramento.model';
import { CursoMonitoramentoService } from '@services/apis/monitoramento/curso-monitoramento.service';
import { UserControllerService } from '@services/outros/user-controller.service';

@Injectable({ providedIn: 'root' })
export class CursoMonitoramentoPorCfcResolver implements Resolve<Observable<CursoMonitoramentoModel[]>> {

  constructor(
    private _service: CursoMonitoramentoService,
    private _userControllerservice: UserControllerService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CursoMonitoramentoModel[]> {
    return this._service.listarTodosPorCfc(1);
    //return this._service.listarTodosPorCfc(this._userControllerservice.getUserLogged().cfc.id);
  }
}
