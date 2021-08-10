import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { FilterService } from '@services/outros/filter.service';
import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';
import { ServicoAgendamentoService } from '@services/apis/agendamento/servico-agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoAgendamentoResolver implements Resolve<Observable<ServicoAgendamentoModel[]>> {

  constructor(
    private _service: ServicoAgendamentoService,
  ) {}

  resolve(): Observable<ServicoAgendamentoModel[]> {
    return this._service.buscarServicos();
  }
}
