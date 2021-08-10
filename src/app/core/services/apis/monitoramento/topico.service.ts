import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HelpConfig } from '@config/help-config';
import { TopicoModel } from '@models/monitoramento/topico.model';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {

  private readonly _url = `${this._helpConfig.MONITORING_API}topico`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string }): Observable<TopicoModel[]> {
    return this._httpClient.get<TopicoModel[]>(`${this._url}`, { params });
  }

  create(topico: TopicoModel): Observable<TopicoModel> {
    return this._httpClient.post<TopicoModel>(`${this._url}`, topico);
  }

  update(topico: TopicoModel): Observable<TopicoModel> {
    return this._httpClient.put<TopicoModel>(`${this._url}`, topico);
  }

  delete(topicoId: string): Observable<null> {
    const END_POINT = `${this._url}/${topicoId}`;
    return this._httpClient.delete<null>(`${END_POINT}`);
  }

  active(topico: TopicoModel): Observable<TopicoModel> {
    const END_POINT = `/ativar/${topico.id}`;
    return this._httpClient.post<TopicoModel>(`${this._url}${END_POINT}`, topico);
  }

  disable(topico: TopicoModel): Observable<TopicoModel> {
    const END_POINT = `/desativar/${topico.id}`;
    return this._httpClient.post<TopicoModel>(`${this._url}${END_POINT}`, topico);
  }

}
