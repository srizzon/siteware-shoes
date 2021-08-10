import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { CandidatoAgendamentoModel } from '@core/models/agendamento/candidato-agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class CandidatoAgendamentoService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}candidatoagendamento`;

  constructor(
    private _httpClient: HttpClient,
    private helpConfig: HelpConfig
    ) {}

  getAll(params?: { [param: string]: string }): Observable<CandidatoAgendamentoModel[]> {
    return this._httpClient.get<CandidatoAgendamentoModel[]>(`${this.url}`, { params });
  }

  addCandidateToClass(classId: number, payload): Observable<CandidatoAgendamentoModel> {
    return this._httpClient.post<CandidatoAgendamentoModel>(`${this.url}/${classId}/candidato`,payload);
  }

  getCandidateByClass(classId: number): Observable<CandidatoAgendamentoModel[]> {
    return this._httpClient.get<CandidatoAgendamentoModel[]>(`${this.url}/${classId}/candidatos`);
  }

  getClassCandidate(classId: number): Observable<CandidatoAgendamentoModel[]> {
    return this._httpClient.get<CandidatoAgendamentoModel[]>(`${this.url}/${classId}/candidatos`);
  }

  removeCandidateFromClass(candidateScheduleId): Observable<null> {
    const path = `${this.url}/${candidateScheduleId}/removercandidato`;
    return this._httpClient.delete<null>(`${path}`);
  }

  pageCount(params?: {[param: string]: any }): Observable<number> {
    const END_POINT = '/pagecount'
    return this._httpClient.get<number>(`${this.url}${END_POINT}`, { params });
  }

}
