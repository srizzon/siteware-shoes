import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HelpConfig } from '@config/help-config';
import { PlanoAulaModel, PlanoAulaRequestModel } from '@models/monitoramento/plano-aula.model';
import { TopicoModel } from '@models/monitoramento/topico.model';
import { ConteudoModel } from '@core/models/monitoramento/conteudo.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoAulaService {

  private readonly _url = `${this._helpConfig.MONITORING_API}planoaula`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  associarConteudoPlanoAula(planoAulaId: any, conteudoId: any): Observable<TopicoModel> {
    const END_POINT = `${this._url}/${planoAulaId}/conteudo/${conteudoId}`;
    return this._httpClient.put<TopicoModel>(END_POINT, null);
  }

  atualizar(payload: PlanoAulaRequestModel): Observable<PlanoAulaModel> {
    return this._httpClient.put<PlanoAulaModel>(this._url, payload);
  }

  buscarPorId(planoAulaId?: any): Observable<PlanoAulaModel> {
    const END_POINT = `${this._url}/${planoAulaId}`;
    return this._httpClient.get<PlanoAulaModel>(END_POINT);
  }

  criar(payload: PlanoAulaRequestModel): Observable<PlanoAulaModel> {
    return this._httpClient.post<PlanoAulaModel>(`${this._url}`, payload);
  }

  listarConteudosPorPlanoAula(planoAulaId?: any): Observable<ConteudoModel[]> {
    const END_POINT = `${this._url}/${planoAulaId}/conteudo`;
    return this._httpClient.get<ConteudoModel[]>(END_POINT);
  }

  listarTodosPorCfc(idCfc?: any): Observable<PlanoAulaModel[]> {
    const END_POINT = `${this._url}/cfc/${idCfc}`;
    return this._httpClient.get<PlanoAulaModel[]>(END_POINT);
  }


  removerConteudoPlanoAula(planoAulaId: any, conteudoId: any): Observable<null> {
    const END_POINT = `${this._url}/${planoAulaId}/conteudo/${conteudoId}`;
    return this._httpClient.delete<null>(END_POINT);
  }
}
