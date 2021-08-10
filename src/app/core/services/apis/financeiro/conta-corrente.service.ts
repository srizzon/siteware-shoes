import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ContaCorrenteModel } from '@models/financeiro/conta-corrente.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class ContaCorrenteService {

  private readonly _url = `${this._helpConfig.FINANCIAL_API}contascorrentes`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  create(account: ContaCorrenteModel): Observable<ContaCorrenteModel> {
    return this._httpClient.post<ContaCorrenteModel>(this._url, account);
  }

  getAll(params?: { [param: string]: any; }): Observable<ContaCorrenteModel[]> {
    return this._httpClient.get<ContaCorrenteModel[]>(this._url, { params });
  }

  getById(id: number): Observable<ContaCorrenteModel> {
    const ENDPOINT = `${this._url}/${id}`
    return this._httpClient.get<ContaCorrenteModel>(ENDPOINT);
  }

  update(account: ContaCorrenteModel): Observable<null> {
    return this._httpClient.put<null>(this._url, account);
  }

  delete(id: number): Observable<null> {
    const ENDPOINT = `${this._url}/${id}/cancelar`
    return this._httpClient.delete<null>(ENDPOINT);
  }
}
