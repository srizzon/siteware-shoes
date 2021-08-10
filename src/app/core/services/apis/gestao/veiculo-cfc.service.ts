import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { VeiculoCfcModel } from '@models/gestao/veiculo-cfc.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoCfcService {

  private readonly _url = `${this._helpConfig.MANAGEMENT_API}veiculocfc`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string }): Observable<VeiculoCfcModel[]> {
    return this._httpClient.get<VeiculoCfcModel[]>(`${this._url}`, { params });
  }

  update(payload: any): Observable<VeiculoCfcModel> {
    return this._httpClient.put<VeiculoCfcModel>(`${this._url}`, payload);
  }

  create(payload: any): Observable<VeiculoCfcModel> {
    return this._httpClient.post<VeiculoCfcModel>(`${this._url}`, payload);
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this._url}/${id}`);
  }
}
