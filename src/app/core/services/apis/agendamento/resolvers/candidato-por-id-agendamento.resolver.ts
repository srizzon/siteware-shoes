import { FilterService } from '@services/outros/filter.service';
import { UserControllerService } from '@services/outros/user-controller.service';
import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { CandidatoAgendamentoModel } from '@core/models/agendamento/candidato-agendamento.model';
import { CandidatoAgendamentoService } from '@services/apis/agendamento/candidato-agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatosPorIdAgendamentoResolver implements Resolve<Observable<CandidatoAgendamentoModel[]>> {

  constructor(
    private _service: CandidatoAgendamentoService,
    private _filterService: FilterService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CandidatoAgendamentoModel[]> {
    let filter = {
      agendamentoId: route.params.id
    };
    filter = this._filterService.formatFilterToNormalUser(filter, 'cfcCnpj')
    return this._service
      .getAll(filter)
      .pipe(
        map(res => res ? res : []),
        catchError(
          () => of(new Array<CandidatoAgendamentoModel>())
        )
      )
  }
}
