import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { CandidatoAgendamentoModel } from '@models/agendamento/candidato-agendamento.model';
import { CandidatoAgendamentoService } from '@services/apis/agendamento/candidato-agendamento.service';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosPorIdCandidatoResolver implements Resolve<Observable<CandidatoAgendamentoModel[]>> {

  constructor(
    private _service: CandidatoAgendamentoService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CandidatoAgendamentoModel[]> {
    return this._service
      .getAll({ matriculaIdExterno: route.params.id })
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<CandidatoAgendamentoModel>())
        )
      )
  }
}


