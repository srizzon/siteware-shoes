import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BancoModel } from '@models/financeiro/banco.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class BancoService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}bancos`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: { [param: string]: any; }): Observable<BancoModel[]> {
    return this.httpClient.get<BancoModel[]>(this.url, { params });
  }

  create(banco: BancoModel): Observable<BancoModel> {
    return this.httpClient.post<BancoModel>(this.url, banco);
  }

  update(banco: BancoModel): Observable<null> {
    return this.httpClient.put<null>(this.url, banco);
  }

  delete(id: number): Observable<null> {
    return this.httpClient.delete<null>(this.url);
  }
}
