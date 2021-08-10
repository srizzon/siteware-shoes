import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GradeCandidatoModel } from '@models/agendamento/grade-candidato.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class GradeCandidatoService {
  private readonly url = `${this.helpConfig.SCHEDULING_API}gradeCandidato`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getAll(params?: { [param: string]: any }): Observable<GradeCandidatoModel[]> {
    return this.httpClient.get<GradeCandidatoModel[]>(`${this.url}`, { params });
  }

  create(service: GradeCandidatoModel): Observable<GradeCandidatoModel> {
    return this.httpClient.post<GradeCandidatoModel>(`${this.url}`, service);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}?id=${id}`);
  }
}
