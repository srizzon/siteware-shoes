import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Toast } from '@services/outros/toast.service';
import { LocalModel } from '@core/models/gestao/local.model';
import { LocalService } from '@services/apis/gestao/local.service';

@Injectable({
  providedIn: 'root'
})
export class LocalPorIdResolver implements Resolve<Observable<LocalModel>> {

  constructor(
    private _service: LocalService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<LocalModel> {
    return this._service
      .getById(route.params.id)
      .pipe(
        map(res => res),
        catchError(
          () => of(new LocalModel())
        )
      )
  }
}
