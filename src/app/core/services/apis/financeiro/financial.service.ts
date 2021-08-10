import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { Ticket, Product, Contract, Audit, FinancialReleasesReturn } from '@models/financial.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {

  private readonly url = `${this.helpConfig.FINANCIAL_API}`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) { }

  getTickets(params: { [param: string]: string }): Observable<Contract[]> {
    const path = `${this.helpConfig.FINANCIAL_API}contratos`;
    return this.httpClient.get<Contract[]>(path, { params });
  }

  getContractById(id: number): Observable<Contract> {
    const path = `${this.helpConfig.FINANCIAL_API}contrato/GetById/${id}`;
    return this.httpClient.get<Contract>(path);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    const path = `${this.url}contrato`;
    return this.httpClient.post<Ticket>(path, ticket);
  }

  cancelTicket(cnpjEmpresa: string, boletoId: string): Observable<boolean> {
    const path = `${this.helpConfig.FINANCIAL_API}gerencianet/CancelarBoleto/${cnpjEmpresa}/${boletoId}`;
    return this.httpClient.delete<boolean>(path);
  }

  getAudits(cnpj: string): Observable<Audit[]> {
    const path = `${this.helpConfig.FINANCIAL_API}servicosGerencianet?cnpj=${cnpj}`;
    return this.httpClient.get<Audit[]>(path);
  }

  getProducts(): Observable<Product[]> {
    const path = `${this.url}produto`;
    return this.httpClient.get<Product[]>(path);
  }

  financialReleases(
    cnpj: string,
    params: { [param: string]: string }
  ): Observable<FinancialReleasesReturn> {
    const path = `${this.helpConfig.FINANCIAL_API}LancamentosFinanceiros/GetByCnpjWithFilter/${cnpj}`;
    return this.httpClient.get<FinancialReleasesReturn>(path, { params });
  }

  financialReleasesPendent(
    cnpj: string,
    initialDate: string,
    finalDate: string
  ): Observable<FinancialReleasesReturn> {
    const path = `${this.helpConfig.FINANCIAL_API}LancamentosFinanceiros/GetByCnpjWithFilter/${cnpj}?status=v&status=A&dataVencimentoInicio=${initialDate}&dataVencimentoFim=${finalDate}`;
    return this.httpClient.get<FinancialReleasesReturn>(path);
  }
}
