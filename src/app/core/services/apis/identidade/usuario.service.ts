import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { UsuarioIdentidadeModel } from '@models/identidade/usuario-identidade.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly url = `${this.helpConfig.IDENTITY_API}users`;

  constructor(
    private httpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getAll(params?: {[param: string]: string }): Observable<UsuarioIdentidadeModel[]> {
    return this.httpClient.get<UsuarioIdentidadeModel[]>(`${this.url}`, { params });
  }

  pageCount(params?: {[param: string]: any }): Observable<any> {
    const END_POINT = '/pagecount'
    return this.httpClient.get<UsuarioIdentidadeModel[]>(`${this.url}${END_POINT}`, { params });
  }

  createUser(user: UsuarioIdentidadeModel): Observable<UsuarioIdentidadeModel> {
    return this.httpClient.post<UsuarioIdentidadeModel>(`${this.url}`, user);
  }

  getById(id: string): Observable<UsuarioIdentidadeModel> {
    return this.httpClient.get<UsuarioIdentidadeModel>(`${this.url}/${id}`)
  }

  updateUser(user: UsuarioIdentidadeModel): Observable<UsuarioIdentidadeModel> {
    return this.httpClient.put<UsuarioIdentidadeModel>(`${this.url}`, user);
  }

  delete(userId: string): Observable<null> {
    const END_POINT = `${this.url}/${userId}`;
    return this.httpClient.delete<null>(`${END_POINT}`);
  }
}
