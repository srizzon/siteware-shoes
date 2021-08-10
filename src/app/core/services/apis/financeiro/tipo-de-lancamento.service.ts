import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { TipoDeLancamentoModel } from '@core/models/financeiro/tipo-de-lancamento.model';

@Injectable({
  providedIn: 'root',
})
export class TipoDeLancamentoService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}tiposLancamento`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
    ) { }

  getAll(params?: {[param: string]: string }): Observable<TipoDeLancamentoModel[]> {
    return this.httpClient.get<TipoDeLancamentoModel[]>(`${this.url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<TipoDeLancamentoModel[]>(`${this.url}${END_POINT}`, { params });
  }

  getById(id: string): Observable<TipoDeLancamentoModel> {
    return this.httpClient.get<TipoDeLancamentoModel>(`${this.url}/${id}`)
  }

  create(releaseType: TipoDeLancamentoModel): Observable<TipoDeLancamentoModel> {
    return this.httpClient.post<TipoDeLancamentoModel>(this.url, releaseType);
  }

  get(payload?: any): Observable<TipoDeLancamentoModel[]> {
    return this.httpClient.get<TipoDeLancamentoModel[]>(this.url, { params: payload });
  }

  delete(id: number): Observable<null> {
    const path = `${this.url}/${id}/cancelar`;
    return this.httpClient.delete<null>(path);
  }

  update(group: TipoDeLancamentoModel): Observable<TipoDeLancamentoModel> {
    const path = `${this.helpConfig.FINANCIAL_API}tiposLancamento`;
    return this.httpClient.put<TipoDeLancamentoModel>(path, group);
  }
}
