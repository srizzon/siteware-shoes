import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertaModel } from '@models/monitoramento/alerta.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private readonly _url = `${this._helpConfig.MONITORING_API}alerta`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  listarAlertasPorAula(aulaId: string): Observable<AlertaModel[]> {
    const END_POINT = `${this._url}/${aulaId}`
    return this._httpClient.get<AlertaModel[]>(END_POINT);
  }
}
