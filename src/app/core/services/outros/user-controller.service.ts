import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Variables } from '@utils/variables';
import { TokenService } from './token.service';
import { LogoutType } from '@enums/logout-types.enum';
import { UserLoginModel } from '@models/outros/user-login.model';


@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  private userSubject = new BehaviorSubject<UserLoginModel>(null);
  private user: UserLoginModel;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  setUser(user: UserLoginModel) {
    this.user = user;
    this.storage.set(Variables.USER_AUTH, user);
    this.userSubject.next(user);
  }

  getUserLogged(): UserLoginModel {
    return this.user;
  }

  setCfc(cfc): void {
    this.user.cfc = cfc;
  }

  isAdmin(): boolean {
    return (this.user.type == "ADMINISTRADOR")
  }

  isAssociado(): boolean {
    return (this.user.associado)
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  recoverFromStorage() {
    return this.storage.get(Variables.USER_AUTH);
  }

  setFromStorage() {
    this.setUser(this.storage.get(Variables.USER_AUTH))
  }

  logout(type: LogoutType = LogoutType.Default) {
    switch (type) {
      case LogoutType.Inactivity:
        this.toastrService.info('Você foi desconectado por inatividade! Por favor, faça o login novamente', 'Desconectado');
        break;
      case LogoutType.Unauthorized:
        this.toastrService.info('Por motivos de autorização você foi desconectado do sistema. Por favor, faça o login novamente.', 'Desconectado');
        break;
      case LogoutType.Expires:
        this.toastrService.info('Sua sessão expirou por inatividade. Por favor, faça o login novamente', 'Sua sessão expirou!');
        break;
      default:
        this.toastrService.info('O logout foi efetuado com sucesso.', 'Logout!');
        break;
    }
    this.storage.remove(Variables.USER_AUTH);
    this.tokenService.removeToken();
    this.userSubject.next(null);
    const path = '/login';
    this.router.navigate([path]);
  }

  isLogged() {
    return this.tokenService.hasToken() && this.tokenService.isTokenExpired();
  }
}
