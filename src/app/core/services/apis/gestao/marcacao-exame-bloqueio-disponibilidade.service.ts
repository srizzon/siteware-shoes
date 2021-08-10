import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { MarcacaoExameDisponibilidadeBloqueio } from '@core/models/gestao/marcacao-exame-bloqueio-disponibilidade.model';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoExameDisponibilidadeBloqueioService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}marcacaoexamedisponibilidadebloqueio`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: any}): Observable<MarcacaoExameDisponibilidadeBloqueio[]> {
    return this.httpClient.get<MarcacaoExameDisponibilidadeBloqueio[]>(`${this.url}`, { params });
  }

  getById(id: number): Observable<MarcacaoExameDisponibilidadeBloqueio> {
    return this.httpClient.get<MarcacaoExameDisponibilidadeBloqueio>(`${this.url}/${id}`);
  }

  create(entity: MarcacaoExameDisponibilidadeBloqueio): Observable<MarcacaoExameDisponibilidadeBloqueio> {
    return this.httpClient.post<MarcacaoExameDisponibilidadeBloqueio>(`${this.url}`, entity);
  }

  update(entity: MarcacaoExameDisponibilidadeBloqueio): Observable<MarcacaoExameDisponibilidadeBloqueio> {
    return this.httpClient.put<MarcacaoExameDisponibilidadeBloqueio>(`${this.url}`, entity);
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<MarcacaoExameDisponibilidadeBloqueio[]>(`${this.url}${END_POINT}`, { params });
  }
}
