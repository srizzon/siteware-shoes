import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { HelpConfig } from '@config/help-config';
import { AgendamentoRequestModel } from '@core/models/agendamento/agendamento-request.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}agendamentos`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getAll(params?: {[param: string]: any }): Observable<AgendamentoModel[]> {
    return this.httpClient.get<AgendamentoModel[]>(`${this.url}`, { params });
  }

  create(schedule: AgendamentoRequestModel): Observable<AgendamentoRequestModel> {
    return this.httpClient.post<AgendamentoRequestModel>(this.url, schedule);
  }

  update(schedule: AgendamentoRequestModel): Observable<AgendamentoRequestModel> {
    return this.httpClient.put<AgendamentoRequestModel>(this.url, schedule);
  }

  delete(scheduleId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}?id=${scheduleId}`);
  }

  getById(id: number): Observable<AgendamentoModel> {
    return this.httpClient.get<AgendamentoModel>(`${this.url}?id=${id}`);
  }

  cancelSchedule(scheduleId: number): Observable<null> {
    return this.httpClient.post<null>(`${this.url}/${scheduleId}/cancelar`, {});
  }

  checkAvailableRoom(params?: {[param: string]: any }): Observable<AgendamentoModel[]> {
    return this.httpClient.get<AgendamentoModel[]>(`${this.url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<AgendamentoModel[]>(`${this.url}${END_POINT}`, { params });
  }

  reschedule(params?: {[param: string]: any }): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/reagendar`, params);
  }
}
