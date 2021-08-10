import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { DistribuicaoModel } from '@models/agendamento/distribuicao.model';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaoService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}distribuicao`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getDistribuicaoByHorarioTurno(params?: {[param: string]: any }): Observable<DistribuicaoModel[]> {
    return this.httpClient.get<DistribuicaoModel[]>(`${this.url}`, { params });
  }

}
