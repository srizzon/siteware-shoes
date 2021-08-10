import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { MarcacaoExameModel } from '@models/gestao/marcacao-exame.model';
import { MarcacaoExameService } from '@services/apis/gestao/marcacao-exames.service';

@Injectable({ providedIn: 'root' })
export class MarcacaoExamePorIdResolver implements Resolve<Observable<MarcacaoExameModel[]>> {

  constructor(
    private _service: MarcacaoExameService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<MarcacaoExameModel[]> {
    return this._service
      .getAll({ id: route.params.id })
      .pipe(
        map(res => res),
        catchError(() => of(new Array<MarcacaoExameModel>()))
      )
  }
}
