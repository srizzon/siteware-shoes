import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GradeModel } from '@models/agendamento/grade.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class GradesService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}grades`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getById(id: number): Observable<GradeModel> {
    return this.httpClient.get<GradeModel>(`${this.url}/${id}`);
  }

  getAll(params?: { [param: string]: string }): Observable<GradeModel[]> {
    return this.httpClient.get<GradeModel[]>(`${this.url}`, { params });
  }

  create(payload: GradeModel): Observable<GradeModel> {
    return this.httpClient.post<GradeModel>(`${this.url}`, payload);
  }

  update(payload: GradeModel): Observable<GradeModel> {
    return this.httpClient.put<GradeModel>(`${this.url}`, payload);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}?id=${id}`);
  }
}
