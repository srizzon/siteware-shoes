import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ContaCorrenteModel } from '@models/financeiro/conta-corrente.model';
import { ContaCorrenteService } from '@services/apis/financeiro/conta-corrente.service';

@Injectable({
  providedIn: 'root',
})
export class ContaCorrentePorIdIdResolver implements Resolve<Observable<ContaCorrenteModel>> {

  constructor(
    private _service: ContaCorrenteService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ContaCorrenteModel> {
    return this._service
      .getById(route.params.id)
      .pipe(
        map(res => res),
        catchError(
          () => of(new ContaCorrenteModel())
        )
      )
  }
}
