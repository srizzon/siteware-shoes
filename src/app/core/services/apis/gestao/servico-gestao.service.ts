import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoGestaoService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}servico`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAllServices(params?: {[param: string]: string}): Observable<ServicoGestaoModel[]> {
    return this.httpClient.get<ServicoGestaoModel[]>(`${this.url}`, { params });
  }

  createService(service: ServicoGestaoModel): Observable<ServicoGestaoModel> {
    return this.httpClient.post<ServicoGestaoModel>(`${this.url}`, service);
  }

  updateService(service: ServicoGestaoModel): Observable<ServicoGestaoModel> {
    return this.httpClient.put<ServicoGestaoModel>(`${this.url}`, service);
  }

  deleteService(serviceId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}?id=${serviceId}`);
  }
}
