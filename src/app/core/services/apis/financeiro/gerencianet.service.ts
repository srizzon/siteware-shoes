import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class GerenciaNetService {
  private readonly url = `${this.helpConfig.FINANCIAL_API}gerencianet`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  deleteBoleto(cnpj: string, boletoId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${cnpj}/${boletoId}/cancelarBoleto`);
  }

  deleteCarne(cnpj: string, carneId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${cnpj}/${carneId}/cancelarCarne`);
  }
}
