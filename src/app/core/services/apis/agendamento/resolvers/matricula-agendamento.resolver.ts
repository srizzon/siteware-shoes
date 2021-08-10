
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MatriculaAgendamentoModel } from '@models/agendamento/matricula-agendamento.model';
import { MatriculaAgendamentoService } from '@services/apis/agendamento/matricula-agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaAgendamentoResolver implements Resolve<Observable<MatriculaAgendamentoModel[]>> {

  constructor(private _service: MatriculaAgendamentoService) {}

  resolve(): Observable<MatriculaAgendamentoModel[]> {
    return this._service.buscarMatriculas();
  }
}
