import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class ServicoAgendamentoService {

  private readonly url = `${this._helpConfig.SCHEDULING_API}servicos`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  buscarServicos(params?: { [param: string]: string }): Observable<ServicoAgendamentoModel[]> {
    return this._httpClient.get<ServicoAgendamentoModel[]>(`${this.url}`, { params });
  }
}
