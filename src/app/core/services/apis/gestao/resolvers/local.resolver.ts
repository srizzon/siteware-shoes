import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { LocalService } from '@services/apis/gestao/local.service'
import { LocalModel } from '@models/gestao/local.model';
import { Toast } from '@services/outros/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LocalResolver implements Resolve<Observable<LocalModel[]>> {

  constructor(
    private _service: LocalService,
    private _toast: Toast
  ) { }

  resolve(): Observable<LocalModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<LocalModel>())
        )
      )
  }
}
