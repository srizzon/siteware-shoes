import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment';

import { Token } from '@models/outros/token.model';
import { UserLoginModel } from '@models/outros/user-login.model';
import { Variables } from '@utils/variables';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  hasToken() {
    return !!this.getToken();
  }

  /**TODO: REFATORAR PARA GUARDAR APENAS O TOKEN */
  setToken(user: UserLoginModel) {

    let tokenData: Token = {
      access_token: '',
      date_token_expire: '',
      expires_in: null,
      refresh_token: '',
      token_type: ''
    }

    tokenData.access_token = user.access_token;
    tokenData.date_token_expire = user.date_token_expire;
    tokenData.expires_in = user.expires_in;
    tokenData.refresh_token = user.refresh_token;
    tokenData.token_type = user.token_type;
    this.storage.set(Variables.STORAGE_AUTH, tokenData);
  }

  getToken(): Token {
    return this.storage.get(Variables.STORAGE_AUTH);
  }

  removeToken() {
    this.storage.remove(Variables.STORAGE_AUTH);
  }

  isTokenExpired() {
    const token: Token = this.storage.get(Variables.STORAGE_AUTH);
    if (token) {
      return moment(new Date()).isAfter(token.date_token_expire);
    }
  }
}
