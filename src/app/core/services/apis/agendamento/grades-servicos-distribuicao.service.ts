import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GradeServicoDistribuicaoModel } from '@models/agendamento/grade-servico-distribuicao.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class GradesServicoDistribuicaoService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}gradeservicodistribuicao`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getServicesGridByIdDistribution(gradeServiceId: number): Observable<GradeServicoDistribuicaoModel[]> {
    return this.httpClient.get<GradeServicoDistribuicaoModel[]>(`${this.url}?gradeServicoId=${gradeServiceId}`);
  }
}
