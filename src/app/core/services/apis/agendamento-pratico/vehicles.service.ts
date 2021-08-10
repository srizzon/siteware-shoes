import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { VehicleModel } from '@models/agendamento-pratico/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private readonly _url = `${this._helpConfig.PRACTICAL_SCHEDULING_API}vehicles`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  create(payload: VehicleModel): Observable<VehicleModel> {
    return this._httpClient.post<VehicleModel>(`${this._url}`, payload);
  }

  getById(id: string): Observable<VehicleModel> {
    return this._httpClient.get<VehicleModel>(`${this._url}/${id}`);
  }

  getAll(params?: { [param: string]: string }): Observable<VehicleModel[]> {
    return this._httpClient.get<VehicleModel[]>(`${this._url}`, { params });
  }

  update(payload: VehicleModel): Observable<VehicleModel> {
    const END_POINT = `${this._url}/${payload.id}`
    return this._httpClient.put<VehicleModel>(END_POINT, payload);
  }

  delete(id: any): Observable<null> {
    const END_POINT = `${this._url}/${id}`;
    return this._httpClient.delete<null>(END_POINT);
  }
}
