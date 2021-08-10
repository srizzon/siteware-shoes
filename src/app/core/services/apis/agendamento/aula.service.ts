import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AulaModel } from '@models/agendamento/aula.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private readonly url = `${this.helpConfig.SCHEDULING_API}agendamentos/`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  queryAllAvailable(params?: {[param: string]: string}): Observable<AulaModel[]> {
    return this.httpClient.get<AulaModel[]>(`${this.url}consultadisponibilidade`, { params });
  }
}
