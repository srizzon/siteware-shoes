import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { LogoutType } from '@enums/logout-types.enum';
import { TokenService } from '@services/outros//token.service';
import { UserControllerService } from '@services/outros/user-controller.service';

@Injectable()
export class RulesGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private userControolerService: UserControllerService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url !== '/') {

      if (this.userControolerService.recoverFromStorage()) {

        this.userControolerService.setFromStorage();

      } else if (this.tokenService.isTokenExpired()) {

        this.userControolerService.logout(LogoutType.Expires);
        this.router.navigate(['/login']);
        return false;

      } else {

        this.router.navigate(['/login']);
        return false;

      }
      /*       if (!this.tokenService.getToken()) {
              this.router.navigate(['/']);
              return false;
            }
       */

    }
    return true;
  }
}
