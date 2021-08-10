import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InstrutorModel } from '@models/gestao/instrutor.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class InstrutorService {

  private readonly _url = `${this._helpConfig.MANAGEMENT_API}instrutores`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) {}

  create(instructor: InstrutorModel): Observable<InstrutorModel> {
    return this._httpClient.post<InstrutorModel>(`${this._url}`, instructor);
  }

  delete(id: any): Observable<null> {
    const END_POINT = `${this._url}/${id}`;
    return this._httpClient.delete<null>(END_POINT);
  }
    getAll(params?: {[param: string]: string }): Observable<InstrutorModel[]> {
    return this._httpClient.get<InstrutorModel[]>(`${this._url}`, { params });
  }

  getInstrutorModelByCategoria(cnpj: string, categoriaDesc: string ): Observable<InstrutorModel[]> {
    const path = `${this._url}GetInstrutorByCategoria/${cnpj}/${categoriaDesc}`;
    return this._httpClient.get<InstrutorModel[]>(path);
  }

  update(instructor: InstrutorModel): Observable<InstrutorModel> {
    return this._httpClient.put<InstrutorModel>(`${this._url}`, instructor);
  }

}
