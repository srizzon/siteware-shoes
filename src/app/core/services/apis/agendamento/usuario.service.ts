import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpConfig } from '@config/help-config';
import { Usuario } from '@models/agendamento/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly url = `${this.helpConfig.SCHEDULING_API}usuario`;

  constructor(
    private htttpClient: HttpClient,
    private helpConfig: HelpConfig
  ) { }

  getUsers(params: {[param: string]: string }): Observable<Usuario[]> {
    return this.htttpClient.get<Usuario[]>(`${this.url}`, { params });
  }

  getUserById(id: number): Observable<Usuario> {
    return this.htttpClient.get<Usuario>(`${this.url}/${id}`);
  }

  createUser(user: Usuario): Observable<Usuario> {
    return this.htttpClient.post<Usuario>(`${this.url}`, user);
  }

  updateUser(user: Usuario): Observable<Usuario> {
    return this.htttpClient.put<Usuario>(`${this.url}`, user);
  }

  deleteUser(userId: number): Observable<null> {
    return this.htttpClient.delete<null>(`${this.url}/${userId}`);
  }
}
