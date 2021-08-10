import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelpConfig } from '@config/help-config';
import { Observable } from 'rxjs';

import { TipoCreditoModel } from '@models/gestao/tipo-credito.model';

@Injectable({
  providedIn: 'root'
})
export class TipoCreditoService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}tipocredito`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) { }

  getAll(params?: {[param: string]: string }): Observable<TipoCreditoModel[]> {
    return this.httpClient.get<TipoCreditoModel[]>(`${this.url}`, { params });
  }
}
