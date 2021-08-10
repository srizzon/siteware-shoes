import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HelpConfig } from '@config/help-config';
import { IniciarAulaModel } from '@models/monitoramento/iniciar-aula.model';
import { AulaMonitoramentoModel } from '@models/monitoramento/aula-monitoramento.model';
import { SincronizarAulaModel } from '@core/models/monitoramento/sincronizar-aula.model';

@Injectable({
  providedIn: 'root'
})
export class AulaMonitoramentoService {

  private readonly _url = `${this._helpConfig.MONITORING_API}aulas`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getById(id: string): Observable<AulaMonitoramentoModel> {
    return this._httpClient.get<AulaMonitoramentoModel>(`${this._url}/${id}`);
  }

  getAll(params?: { [param: string]: any }): Observable<AulaMonitoramentoModel[]> {
    return this._httpClient.get<AulaMonitoramentoModel[]>(`${this._url}`, { params });
  }

  listarAulasPorCpf(cpf: string): Observable<AulaMonitoramentoModel> {
    const END_POINT = `${this._url}/candidato/${cpf}`
    return this._httpClient.get<AulaMonitoramentoModel>(END_POINT);
  }

  listarAulasPorCnpj(cnpj: string): Observable<AulaMonitoramentoModel> {
    const END_POINT = `${this._url}/cfc/${cnpj}`
    return this._httpClient.get<AulaMonitoramentoModel>(END_POINT);
  }

  iniciarAula(payload: IniciarAulaModel): Observable<IniciarAulaModel> {
    return this._httpClient.post<IniciarAulaModel>(`${this._url}`, payload);
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this._httpClient.get<number>(`${this._url}${END_POINT}`, { params });
  }

  sincronizarAula(payload: SincronizarAulaModel): Observable<SincronizarAulaModel> {
    const END_POINT = `${this._url}/sincronizar`
    return this._httpClient.post<SincronizarAulaModel>(END_POINT, payload);
  }

}
