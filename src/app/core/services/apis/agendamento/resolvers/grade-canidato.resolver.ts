import { map, catchError } from 'rxjs/operators';
import { FilterService } from '@services/outros/filter.service';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { GradeCandidatoModel } from '@models/agendamento/grade-candidato.model';
import { GradeCandidatoService } from '@services/apis/agendamento/grade-candidato.service';

@Injectable({
  providedIn: 'root'
})
export class GradeCandidatoResolver implements Resolve<Observable<GradeCandidatoModel[]>> {

  constructor(
    private _service: GradeCandidatoService,
    private _filterService: FilterService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<GradeCandidatoModel[]> {
    let filter = {
      gradeId: route.params.id,
      ativo: 1
    };
    filter = this._filterService.formatFilterToNormalUser(filter, 'cfcCnpj');
    return this._service
      .getAll(filter)
      .pipe(
        map(res => res ? res : []),
        catchError(
          () => of(new Array<GradeCandidatoModel>())
        )
      )
  }
}
