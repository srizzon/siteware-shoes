import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { BancoModel } from '@models/financeiro/banco.model';
import { BancoService } from '@services/apis/financeiro/banco.service';
import { Toast } from '@services/outros/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BancoResolver implements Resolve<Observable<BancoModel[]>> {

  constructor(
    private _service: BancoService,
    private _toast: Toast
  ) { }

  resolve(): Observable<BancoModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<BancoModel>())
        )
      )
  }
}
