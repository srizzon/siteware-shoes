import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { InstrutorService } from '@services/apis/gestao/instrutor.service';
import { InstrutorModel } from '@models/gestao/instrutor.model';
import { Toast } from '@services/outros/toast.service';

@Injectable({
  providedIn: 'root',
})
export class InstrutorPorCpfResolver implements Resolve<Observable<InstrutorModel[]>> {

  constructor(
    private _service: InstrutorService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<InstrutorModel[]> {
    return this._service
      .getAll({ cpf: route.params.cpf })
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<InstrutorModel>())
        )
      )
  }
}
