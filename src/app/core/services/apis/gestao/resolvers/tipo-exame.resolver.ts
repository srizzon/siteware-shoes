import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ExameService } from '@services/apis/gestao/exame.service';
import { ConstantModel } from '@models/outros/constant.model';

@Injectable({
  providedIn: 'root'
})
export class TipoExameResolver implements Resolve<Observable<ConstantModel[]>> {

  constructor(
    private _service: ExameService,
  ) { }

  resolve(): Observable<ConstantModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(() => of(new Array<ConstantModel>()))
      )
  }
}
