import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { InstrutorCfcService } from './../instrutor-cfc.service';
import { Toast } from '@services/outros/toast.service';
import { InstrutorCfcModel } from '@core/models/gestao/instrutor-cfc.model';

@Injectable({
  providedIn: 'root',
})
export class InstrutorCfcResolver implements Resolve<Observable<InstrutorCfcModel[]>> {

  constructor(
    private _service: InstrutorCfcService,
    private _toast: Toast
  ) { }

  resolve(): Observable<InstrutorCfcModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<InstrutorCfcModel>())
        )
      )
  }
}
