import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Candidato } from '@models/gestao/candidato.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class CandidatoGestaoService {

  private readonly url = `${this.helpConfig.MANAGEMENT_API}candidatos`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) {}

  getCandidatos(params?: { [param: string]: string }): Observable<Candidato[]> {
    return this.httpClient.get<Candidato[]>(`${this.url}`, { params });
  }

  updateCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.put<Candidato>(`${this.url}`, candidato);
  }

  createCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.post<Candidato>(`${this.url}`, candidato);
  }

  deleteCandidato(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}
