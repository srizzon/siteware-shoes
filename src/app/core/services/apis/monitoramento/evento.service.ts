import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DispositivoModel } from '@models/monitoramento/dispositivo.model';
import { HelpConfig } from '@config/help-config';
import { EventoModel } from '@core/models/monitoramento/evento.model';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly _url = `${this._helpConfig.MONITORING_API}eventos`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string}): Observable<EventoModel[]> {
    return this._httpClient.get<EventoModel[]>(this._url, { params });
  }


  listAllByAulaId(aulaId: string): Observable<EventoModel> {
    const END_POINT = `${this._url}/${aulaId}/eventos`
    return this._httpClient.get<EventoModel>(END_POINT);
  }

  getPageCount(size: number): Observable<number> {
    return this._httpClient.get<number>(`${this._url}/pagecount?pageSize=${size}`);
  }

  registrarEvento(payload: EventoModel): Observable<EventoModel> {
    return this._httpClient.post<EventoModel>(this._url, payload);
  }
}
