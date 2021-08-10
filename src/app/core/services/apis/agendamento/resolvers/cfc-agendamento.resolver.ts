import { FilterService } from '@services/outros/filter.service';

import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CfcAgendamentoModel } from '@core/models/agendamento/cfc-agendamento.model';
import { CfcAgendamentoService } from '@services/apis/agendamento/cfc-agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class CfcAgendamentoResolver implements Resolve<Observable<CfcAgendamentoModel[]>> {

  constructor(
    private _service: CfcAgendamentoService,
    private _filterService: FilterService
  ) {}

  resolve(): Observable<CfcAgendamentoModel[]> {
    const filter = this._filterService.formatFilterToNormalUser({}, 'cnpj')
    return this._service.buscarCfcs(filter);
  }
}
