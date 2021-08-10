import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Observable, Subscription } from 'rxjs';

import * as moment from 'moment';

import { HelpConfig } from '@config/help-config';
import { Token } from '@models/outros/token.model';
import { TokenService } from './token.service';
import { UserLoginModel } from '@models/outros/user-login.model';
import { userMock } from './../../mock/user.mock';
import { UserControllerService } from './user-controller.service';

@Injectable()
export class AuthService implements OnDestroy {

  token: Token = null;
  private _subscription: Subscription;

  constructor(
    private _httpClient: HttpClient,
    private _helpConfig: HelpConfig,
    private _tokenService: TokenService,
    private _userControllerService: UserControllerService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this._subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  authenticate(user: any, successCallBack, errorCallBack) {

    const payload = {
      'username': user.username,
      'password': user.password
    }

    /****************FakeLogin********************/
    /*     this.tokenService.setToken(userMock);
        this.userControllerService.setUser(userMock);
        return successCallBack(userMock) */


    this._subscription.add(
      this.login(payload)
        .subscribe(
          (loginResult: UserLoginModel) => {
            this._tokenService.setToken(loginResult);
            this._userControllerService.setUser(loginResult);
            return successCallBack(loginResult)
          },
          (err) => errorCallBack(err)
        )
    )
  }

  refreshToken(): Observable<any> {

    return new Observable<any>(
      (observable) => {
        const token = this._tokenService.getToken();
        this._subscription.add(
          this.refresh(token)
            .pipe()
            .subscribe(
              (resultRefresh: UserLoginModel) => {
                let dateToExpire = moment(new Date).add(resultRefresh.expires_in, 'seconds').format()
                resultRefresh.date_token_expire = dateToExpire;
                this._tokenService.setToken(resultRefresh);
                observable.next(resultRefresh)
              },
              (err) => observable.error(err)
            )
        )
      })
  }

  login(payload: any): Observable<any> {
    const END_POINT: string = 'autenticacao';
    return this._httpClient.post(`${this._helpConfig.MANAGEMENT_API}${END_POINT}`, payload);
  }

  refresh(token: Token): Observable<any> {
    const END_POINT: string = 'refreshtoken';
    const payloadRefreshToken = { 'value': token.refresh_token };
    return this._httpClient.post(`${this._helpConfig.SCHEDULING_API}${END_POINT}`, payloadRefreshToken);
  }

}
