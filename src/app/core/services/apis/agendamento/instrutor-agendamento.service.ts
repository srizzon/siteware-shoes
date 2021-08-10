import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { InstrutorAgendamentoModel } from '@models/agendamento/instrutor-agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class InstrutorAgendamentoService {

  private readonly url = `${this._helpConfig.SCHEDULING_API}instrutorcfc`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  buscarInstrutores(params?: { [param: string]: string }): Observable<InstrutorAgendamentoModel[]> {
    return this._httpClient.get<InstrutorAgendamentoModel[]>(`${this.url}`, { params });
  }
}
