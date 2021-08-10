import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { SchedulePracticalsModel } from '@models/agendamento-pratico/schedule-practicals.model';
import { SchedulePraticalsRequestModel } from '@models/agendamento-pratico/schedule-practicals-request.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulePracticalsService {

  private readonly _url = `${this._helpConfig.PRACTICAL_SCHEDULING_API}schedulepracticals`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  create(payload: SchedulePraticalsRequestModel): Observable<SchedulePraticalsRequestModel> {
    return this._httpClient.post<SchedulePraticalsRequestModel>(`${this._url}`, payload);
  }

  getAll(params?: { [param: string]: any }): Observable<SchedulePracticalsModel[]> {
    return this._httpClient.get<SchedulePracticalsModel[]>(`${this._url}`, { params });
  }

  getById(id: string): Observable<SchedulePracticalsModel> {
    return this._httpClient.get<SchedulePracticalsModel>(`${this._url}/${id}`);
  }

  getByOrganization(id: string): Observable<SchedulePracticalsModel> {
    const END_POINT = `${this._url}/organization/${id}`
    return this._httpClient.get<SchedulePracticalsModel>(`${END_POINT}`);
  }

  getByInstructor(id: string): Observable<SchedulePracticalsModel> {
    const END_POINT = `${this._url}/instructor/${id}`
    return this._httpClient.get<SchedulePracticalsModel>(`${END_POINT}`);
  }

  update(payload: SchedulePraticalsRequestModel): Observable<SchedulePraticalsRequestModel> {
    const END_POINT = `${this._url}/${payload.id}`
    return this._httpClient.put<SchedulePraticalsRequestModel>(END_POINT, payload);
  }

  delete(id: any): Observable<null> {
    const END_POINT = `${this._url}/${id}`;
    return this._httpClient.delete<null>(END_POINT);
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = `${this._url}/pagecount`
    return this._httpClient.get<SchedulePracticalsModel[]>(END_POINT, { params });
  }

}
