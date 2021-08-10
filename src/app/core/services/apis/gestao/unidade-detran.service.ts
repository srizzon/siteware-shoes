import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { UnidadeDetran } from '@models/gestao/unidade-detran.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeDetranService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}unidadedetran`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string}): Observable<UnidadeDetran[]> {
    return this.httpClient.get<UnidadeDetran[]>(`${this.url}`, { params });
  }
}
