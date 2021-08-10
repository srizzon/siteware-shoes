import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { GradeServicoDistribuicaoModel } from '@models/agendamento/grade-servico-distribuicao.model';

@Injectable({
  providedIn: 'root',
})
export class GradeServicoCursoOrdemService {
  private readonly url = `${this.helpConfig.SCHEDULING_API}gradeservicocursoordem`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getByGradeServiceId(gradeServiceId: number): Observable<GradeServicoDistribuicaoModel[]> {
    return this.httpClient.get<GradeServicoDistribuicaoModel[]>(`${this.url}?gradeServicoId=${gradeServiceId}`);
  }

}
