import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DispositivoModel } from '@models/monitoramento/dispositivo.model';
import { HelpConfig } from '@config/help-config';


@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  private readonly _url = `${this._helpConfig.MONITORING_API}dispositivos`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  ativarDispositivo(dispositivoId: any): Observable<DispositivoModel> {
    const END_POINT = `/ativar/${dispositivoId}`;
    return this._httpClient.post<DispositivoModel>(`${this._url}${END_POINT}`, null);
  }

  atualizarDispositivo(params: DispositivoModel): Observable<DispositivoModel> {
    return this._httpClient.put<DispositivoModel>(`${this._url}`, params);
  }

  buscarPorId(dispositivoId?: any): Observable<DispositivoModel> {
    const END_POINT = `${this._url}/${dispositivoId}`;
    return this._httpClient.get<DispositivoModel>(END_POINT);
  }

  criar(payload: DispositivoModel): Observable<DispositivoModel> {
    return this._httpClient.post<DispositivoModel>(`${this._url}`, payload);
  }

  desativarDispositivo(idDispositivo: any): Observable<DispositivoModel> {
    const END_POINT = `/desativar/${idDispositivo}`;
    return this._httpClient.post<DispositivoModel>(`${this._url}${END_POINT}`, null);
  }

  listarTodos(params?: { [param: string]: string }): Observable<DispositivoModel[]> {
    return this._httpClient.get<DispositivoModel[]>(`${this._url}`, { params });
  }

  listarTodosPorCfc(idCfc?: any): Observable<DispositivoModel[]> {
    const END_POINT = `${this._url}/cfc/${idCfc}`;
    return this._httpClient.get<DispositivoModel[]>(END_POINT);
  }

  removerCurso(dispositivoId: string): Observable<null> {
    const END_POINT = `${this._url}/${dispositivoId}`;
    return this._httpClient.delete<null>(`${END_POINT}`);
  }

  removerDispositivo(dispositivoId: any): Observable<null> {
    const END_POINT = `${this._url}/${dispositivoId}`;
    return this._httpClient.delete<null>(END_POINT);
  }

}
