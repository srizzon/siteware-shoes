import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { HelpConfig } from '@config/help-config';
import { Venda } from '@models/financeiro/venda-model';

@Injectable({
  providedIn: 'root',
})
export class VendaService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}vendas`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  createVendaPf(venda: Venda): Observable<Venda> {
    const END_POINT = '/pf';
    return this.httpClient.post<Venda>(`${this.url}${END_POINT}`, venda);
  }
}
