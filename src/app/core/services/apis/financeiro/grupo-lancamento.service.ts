import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GrupoLancamentoModel } from '@models/financeiro/grupo-lancamento.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class GrupoLancamentoService {

  private readonly _url = `${this._helpConfig.FINANCIAL_API}gruposLancamento`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string }): Observable<GrupoLancamentoModel[]> {
    return this._httpClient.get<GrupoLancamentoModel[]>(`${this._url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this._httpClient.get<GrupoLancamentoModel[]>(`${this._url}${END_POINT}`, { params });
  }

  create(group: GrupoLancamentoModel): Observable<GrupoLancamentoModel> {
    return this._httpClient.post<GrupoLancamentoModel>(this._url, group);
  }

  update(group: GrupoLancamentoModel): Observable<GrupoLancamentoModel> {
    return this._httpClient.put<GrupoLancamentoModel>(this._url, group);
  }

  delete(id: number): Observable<null> {
    const END_POINT = `${this._url}/${id}`;
    return this._httpClient.delete<null>(END_POINT);
  }
}
