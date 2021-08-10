import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { LocalModel } from '@models/gestao/local.model';

@Injectable({
  providedIn: 'root',
})
export class LocalService {

  private readonly _url = `${this._helpConfig.MANAGEMENT_API}local`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  create(payload: LocalModel): Observable<LocalModel> {
    return this._httpClient.post<LocalModel>(`${this._url}`, payload);
  }

  delete(id: any): Observable<null> {
    const END_POINT = `${this._url}/${id}`;
    return this._httpClient.delete<null>(END_POINT);
  }

  getById(id: string): Observable<LocalModel> {
    return this._httpClient.get<LocalModel>(`${this._url}/${id}`);
  }

  getAll(params?: { [param: string]: string }): Observable<LocalModel[]> {
    return this._httpClient.get<LocalModel[]>(`${this._url}`, { params });
  }

  update(payload: LocalModel): Observable<LocalModel> {
    const END_POINT = `${this._url}/${payload.id}`
    return this._httpClient.put<LocalModel>(END_POINT, payload);
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = `${this._url}/pagecount`
    return this._httpClient.get<LocalModel[]>(END_POINT, { params });
  }
}
