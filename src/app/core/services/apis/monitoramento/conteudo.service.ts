import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HelpConfig } from '@config/help-config';
import { ConteudoModel } from '@models/monitoramento/conteudo.model';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {

  private readonly _url = `${this._helpConfig.MONITORING_API}conteudo`;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig
  ) { }

  atualizarConteudo(params: ConteudoModel): Observable<ConteudoModel> {
    return this._httpClient.put<ConteudoModel>(`${this._url}`, params);
  }

  buscarPorId(conteudoId?: any): Observable<ConteudoModel> {
    const END_POINT = `${this._url}/${conteudoId}`;
    return this._httpClient.get<ConteudoModel>(END_POINT);
  }

  criar(payload: ConteudoModel): Observable<ConteudoModel> {
    return this._httpClient.post<ConteudoModel>(`${this._url}`, payload);
  }

  desabilitar(conteudoId: any): Observable<ConteudoModel> {
    const END_POINT = `${this._url}/desabilitar/${conteudoId}`;
    return this._httpClient.put<ConteudoModel>(END_POINT, null);
  }

  editar(conteudoId: any): Observable<ConteudoModel> {
    const END_POINT = `${this._url}/desabilitar/${conteudoId}`;
    return this._httpClient.put<ConteudoModel>(END_POINT, null);
  }

  getByPlanoAula(id?: any): Observable<ConteudoModel[]> {
    let END_POINT = `/planoAula/${id}`;
    return this._httpClient.get<ConteudoModel[]>(`${this._url}${END_POINT}`);
  }

  getByConteudosPorTopico(id?: any): Observable<ConteudoModel[]> {
    let END_POINT = `/topico/${id}`;
    return this._httpClient.get<ConteudoModel[]>(`${this._url}${END_POINT}`);
  }

  habilitar(conteudoId: any): Observable<ConteudoModel> {
    const END_POINT = `${this._url}/habilitar/${conteudoId}`;
    return this._httpClient.put<ConteudoModel>(END_POINT, null);
  }

  listarConteudos(): Observable<ConteudoModel[]> {
    return this._httpClient.get<ConteudoModel[]>(this._url);
  }

}
