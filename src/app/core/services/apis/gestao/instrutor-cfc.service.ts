import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InstrutorModel } from '@models/gestao/instrutor.model';
import { HelpConfig } from '@config/help-config';
import { InstrutorCfcModel } from '@core/models/gestao/instrutor-cfc.model';

@Injectable({
  providedIn: 'root',
})
export class InstrutorCfcService {

  private readonly _url = `${this._helpConfig.MANAGEMENT_API}instrutorcfc`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  getAll(params?: {[param: string]: string }): Observable<InstrutorCfcModel[]> {
    return this._httpClient.get<InstrutorCfcModel[]>(`${this._url}`, { params });
  }

  update(payload: InstrutorCfcModel): Observable<InstrutorCfcModel> {
    return this._httpClient.put<InstrutorCfcModel>(`${this._url}`, payload);
  }

  create(payload: any): Observable<InstrutorCfcModel> {
    return this._httpClient.post<InstrutorCfcModel>(`${this._url}`, payload);
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this._url}/${id}`);
  }
}
