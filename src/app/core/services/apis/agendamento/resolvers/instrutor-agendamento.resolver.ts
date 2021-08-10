import { InstrutorAgendamentoService } from '@services/apis/agendamento/instrutor-agendamento.service';
import { FilterService } from '@services/outros/filter.service';

import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { InstrutorAgendamentoModel } from '@core/models/agendamento/instrutor-agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class InstrutorAgendamentoResolver implements Resolve<Observable<InstrutorAgendamentoModel[]>> {

  constructor(
    private _service: InstrutorAgendamentoService,
    private _filterService: FilterService
  ) {}

  resolve(): Observable<InstrutorAgendamentoModel[]> {
    const filter = this._filterService.formatFilterToNormalUser({}, 'cfcCnpj')
    return this._service.buscarInstrutores(filter);
  }
}
