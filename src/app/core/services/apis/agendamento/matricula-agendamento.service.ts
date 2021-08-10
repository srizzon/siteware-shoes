import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { MatriculaAgendamentoModel } from '@models/agendamento/matricula-agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class MatriculaAgendamentoService {

  private readonly url = `${this._helpConfig.SCHEDULING_API}matriculas`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  buscarMatriculas(params?: { [param: string]: string }): Observable<MatriculaAgendamentoModel[]> {
    return this._httpClient.get<MatriculaAgendamentoModel[]>(`${this.url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this._httpClient.get<MatriculaAgendamentoModel[]>(`${this.url}${END_POINT}`, { params });
  }

}
