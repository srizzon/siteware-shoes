import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class ContratoFinanceiroService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}contratos`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params: { [param: string]: any }): Observable<ContratoFinanceiroModel[]> {
    return this.httpClient.get<ContratoFinanceiroModel[]>(`${this.url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<ContratoFinanceiroModel[]>(`${this.url}${END_POINT}`, { params });
  }

  getHistoric(params: { [param: string]: string }): Observable<ContratoFinanceiroModel[]> {
    return this.httpClient.get<ContratoFinanceiroModel[]>(`${this.url}`, { params });
  }

  getById(id: number): Observable<ContratoFinanceiroModel> {
    return this.httpClient.get<ContratoFinanceiroModel>(`${this.url}/${id}`);
  }
}
