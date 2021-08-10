import { Processo } from '@models/gestao/processo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class ProcessosService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}processos`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getFromDetran(cpf: string): Observable<Processo> {
    return this.httpClient.get<Processo>(`${this.url}/${cpf}/buscardetran`);
  }
}
