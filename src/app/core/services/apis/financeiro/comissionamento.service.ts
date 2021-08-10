
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ComissionamentoModel } from '@models/financeiro/comissionamento.model';
import { HelpConfig } from '@config/help-config';
@Injectable({
  providedIn: 'root'
})
export class ComissionamentoService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}comissionamento`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) { }

  getAll(params?: { [param: string]: any; }): Observable<ComissionamentoModel[]> {
    return this.httpClient.get<ComissionamentoModel[]>(this.url, { params });
  }

  getById(id: number): Observable<ComissionamentoModel> {
    return this.httpClient.get<ComissionamentoModel>(this.url);
  }

  create(comissionamento: ComissionamentoModel): Observable<ComissionamentoModel> {
    return this.httpClient.post<ComissionamentoModel>(this.url, comissionamento);
  }

  update(comissionamento: ComissionamentoModel): Observable<null> {
    return this.httpClient.put<null>(this.url, comissionamento);
  }

  delete(id: number): Observable<null> {
    return this.httpClient.delete<null>(this.url);
  }
}
