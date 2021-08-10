import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CursoAgendamentoModel } from '@core/models/agendamento/curso-agendamento.model';
import { CursoAgendamentoService } from '@services/apis/agendamento/curso-agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class CursoAgendamentoResolver implements Resolve<Observable<CursoAgendamentoModel[]>> {

  constructor(
    private _service: CursoAgendamentoService
  ) {}

  resolve(): Observable<CursoAgendamentoModel[]> {
    return this._service.buscarCursos();
  }
}
