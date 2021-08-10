import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MarcacaoExameDisponibilidadeCache } from '@models/gestao/marcacao-exame-disponibilidade-cache.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoExameDisponibilidadeCacheService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}marcacaoexamedisponibiildadecache/grouped`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: any}): Observable<MarcacaoExameDisponibilidadeCache[]> {
    return this.httpClient.get<MarcacaoExameDisponibilidadeCache[]>(`${this.url}`, { params });
  }
}
