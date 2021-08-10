import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { VeiculoModel } from '@core/models/gestao/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private readonly _url = `${this._helpConfig.MANAGEMENT_API}veiculos`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string }): Observable<VeiculoModel[]> {
    return this._httpClient.get<VeiculoModel[]>(`${this._url}`, { params });
  }

  update(payload: any): Observable<VeiculoModel> {
    return this._httpClient.put<VeiculoModel>(`${this._url}`, payload);
  }

  create(payload: any): Observable<VeiculoModel> {
    return this._httpClient.post<VeiculoModel>(`${this._url}`, payload);
  }

  delete(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${this._url}/${id}`);
  }
}
