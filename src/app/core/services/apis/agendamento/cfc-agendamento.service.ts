import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { CfcAgendamentoModel } from '@core/models/agendamento/cfc-agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class CfcAgendamentoService {

  private readonly url = `${this._helpConfig.SCHEDULING_API}cfcs`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  buscarCfcs(params?: { [param: string]: string }): Observable<CfcAgendamentoModel[]> {
    return this._httpClient.get<CfcAgendamentoModel[]>(`${this.url}`, { params });
  }
}
