import { MarcacaoExameRequestModel } from '@models/gestao/marcacao-exame-request-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MarcacaoExameModel } from '@models/gestao/marcacao-exame.model';
import { HelpConfig } from '@config/help-config';

@Injectable({
  providedIn: 'root',
})
export class MarcacaoExameService {
  private readonly url = `${this.helpConfig.MANAGEMENT_API}marcacaoexames`;

  constructor(private httpClient: HttpClient, private helpConfig: HelpConfig) {}

  getAll(params?: { [param: string]: any }): Observable<MarcacaoExameModel[]> {
    return this.httpClient.get<MarcacaoExameModel[]>(`${this.url}`, { params });
  }

  create(payload: MarcacaoExameRequestModel): Observable<MarcacaoExameRequestModel> {
    return this.httpClient.post<MarcacaoExameRequestModel>(`${this.url}`, payload);
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<MarcacaoExameModel[]>(`${this.url}${END_POINT}`, { params });
  }

  cancel(id: number, comentario: string): Observable<MarcacaoExameModel> {
    return this.httpClient.post<MarcacaoExameModel>(
      `${this.url}/cancelar?id=${id}`,
      { id, comentario }
    );
  }
}
