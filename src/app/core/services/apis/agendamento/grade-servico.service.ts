import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { GradeServicoModel } from '@models/agendamento/grade-servico.model';

@Injectable({
  providedIn: 'root',
})
export class GradeServicoService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}gradeservico`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getAllServicesGrid(params?: {[param: string]: any}): Observable<GradeServicoModel[]> {
    return this.httpClient.get<GradeServicoModel[]>(`${this.url}`, { params });
  }

  getServicesGridById(serviceId: number): Observable<GradeServicoModel> {
    return this.httpClient.get<GradeServicoModel>(`${this.url}/${serviceId}`);
  }

  createServiceGrid(service: GradeServicoModel): Observable<GradeServicoModel> {
    return this.httpClient.post<GradeServicoModel>(`${this.url}`, service);
  }

  updateServiceGrid(service: GradeServicoModel): Observable<GradeServicoModel> {
    return this.httpClient.put<GradeServicoModel>(`${this.url}`, service);
  }

  deleteServiceGrid(serviceId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}?id=${serviceId}`);
  }
}
