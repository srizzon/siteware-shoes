import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CursoAgendamentoModel } from '@models/agendamento/curso-agendamento.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class CursoAgendamentoService {

  private readonly url = `${this._helpConfig.SCHEDULING_API}cursos`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  buscarCursos(params?: { [param: string]: string }): Observable<CursoAgendamentoModel[]> {
    return this._httpClient.get<CursoAgendamentoModel[]>(`${this.url}`, { params });
  }
}
