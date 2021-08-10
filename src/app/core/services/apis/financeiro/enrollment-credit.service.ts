import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelpConfig } from '@config/help-config';
import { Observable } from 'rxjs';

import { CreditoMatricula } from '@models/gestao/credito-matricula.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentCreditService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}creditosMatricula`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) { }

  getAll(params?: {[param: string]: any }): Observable<CreditoMatricula[]> {
    return this.httpClient.get<CreditoMatricula[]>(`${this.url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<CreditoMatricula[]> {
    const END_POINT = '/pagecount';
    return this.httpClient.get<CreditoMatricula[]>(`${this.url}${END_POINT}`, { params });
  }

  create(user: CreditoMatricula): Observable<CreditoMatricula> {
    return this.httpClient.post<CreditoMatricula>(`${this.url}`, user);
  }

  getById(id: string): Observable<CreditoMatricula> {
    return this.httpClient.get<CreditoMatricula>(`${this.url}/${id}`)
  }

  update(user: CreditoMatricula): Observable<CreditoMatricula> {
    return this.httpClient.put<CreditoMatricula>(`${this.url}`, user);
  }

  delete(id: string): Observable<null> {
    const END_POINT = `${this.url}/${id}`;
    return this.httpClient.delete<null>(`${END_POINT}`);
  }
}
