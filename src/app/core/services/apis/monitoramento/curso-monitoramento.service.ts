import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HelpConfig } from '@config/help-config';
import { CursoMonitoramentoModel } from '@core/models/monitoramento/curso-monitoramento.model';


@Injectable({
  providedIn: 'root'
})
export class CursoMonitoramentoService {

  private readonly _url = `${this._helpConfig.MONITORING_API}curso`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  associarPlanoAulaCurso(cursoId: any, planoAulaId: any): Observable<CursoMonitoramentoModel> {
    const END_POINT = `${this._url}/${cursoId}/planoaula/${planoAulaId}`;
    return this._httpClient.put<CursoMonitoramentoModel>(END_POINT, null);
  }

  ativarCurso(idCurso: any): Observable<CursoMonitoramentoModel> {
    const END_POINT = `/ativar/${idCurso}`;
    return this._httpClient.post<CursoMonitoramentoModel>(`${this._url}${END_POINT}`, null);
  }

  atualizarCurso(params: CursoMonitoramentoModel): Observable<CursoMonitoramentoModel> {
    return this._httpClient.put<CursoMonitoramentoModel>(`${this._url}`, params);
  }

  buscarPorId(cursoId?: any): Observable<CursoMonitoramentoModel> {
    const END_POINT = `${this._url}/${cursoId}`;
    return this._httpClient.get<CursoMonitoramentoModel>(END_POINT);
  }


  criarCurso(params: CursoMonitoramentoModel): Observable<CursoMonitoramentoModel> {
    return this._httpClient.post<CursoMonitoramentoModel>(`${this._url}`, params);
  }

  desativarCurso(idCurso: any): Observable<CursoMonitoramentoModel> {
    const END_POINT = `/desativar/${idCurso}`;
    return this._httpClient.post<CursoMonitoramentoModel>(`${this._url}${END_POINT}`, null);
  }

  listarTodos(params?: { [param: string]: string }): Observable<CursoMonitoramentoModel[]> {
    return this._httpClient.get<CursoMonitoramentoModel[]>(`${this._url}`, { params });
  }

  listarTodosPorCfc(idCfc?: any): Observable<CursoMonitoramentoModel[]> {
    const END_POINT = `${this._url}/cfc/${idCfc}`;
    return this._httpClient.get<CursoMonitoramentoModel[]>(END_POINT);
  }

  removerCurso(cursoId: string): Observable<null> {
    const END_POINT = `${this._url}/${cursoId}`;
    return this._httpClient.delete<null>(`${END_POINT}`);
  }

  removerPlanoAulaCurso(cursoId: any, planoAulaId: any): Observable<null> {
    const END_POINT = `${this._url}/${cursoId}/planoaula/${planoAulaId}`;
    return this._httpClient.delete<null>(END_POINT);
  }

}
