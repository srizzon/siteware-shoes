import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { CreditoMatricula } from '@models/gestao/credito-matricula.model';

@Injectable({
  providedIn: 'root',
})
export class CreditoMatriculaService {

  private readonly url = `${this.helpConfig.MANAGEMENT_API}creditomatricula`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getById(id: string): Observable<CreditoMatricula[]> {
    return this.httpClient.get<CreditoMatricula[]>(`${this.url}/${id}`);
  }

}
