import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ContaCorrenteModel } from '@models/financeiro/conta-corrente.model';
import { ContaCorrenteService } from '@services/apis/financeiro/conta-corrente.service';

@Injectable({
  providedIn: 'root',
})
export class ContasCorrenteResolver implements Resolve<Observable<ContaCorrenteModel[]>> {

  constructor(
    private _service: ContaCorrenteService
  ) { }

  resolve(): Observable<ContaCorrenteModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<ContaCorrenteModel>())
        )
      )
  }
}
