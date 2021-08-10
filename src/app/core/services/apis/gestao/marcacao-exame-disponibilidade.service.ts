import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MarcacaoExameDisponibilidade } from '@models/gestao/marcacao-exame-disponibilidade.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoExameDisponibilidadeService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}marcacaoexamedisponibilidade`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: any}): Observable<MarcacaoExameDisponibilidade[]> {
    return this.httpClient.get<MarcacaoExameDisponibilidade[]>(`${this.url}`, { params });
  }

  getById(id: number): Observable<MarcacaoExameDisponibilidade> {
    return this.httpClient.get<MarcacaoExameDisponibilidade>(`${this.url}/${id}`);
  }

  create(entity: MarcacaoExameDisponibilidade): Observable<MarcacaoExameDisponibilidade> {
    return this.httpClient.post<MarcacaoExameDisponibilidade>(`${this.url}`, entity);
  }

  update(entity: MarcacaoExameDisponibilidade): Observable<MarcacaoExameDisponibilidade> {
    return this.httpClient.put<MarcacaoExameDisponibilidade>(`${this.url}`, entity);
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<MarcacaoExameDisponibilidade[]>(`${this.url}${END_POINT}`, { params });
  }
}
