import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserControllerService } from '@services/outros/user-controller.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

@Injectable()
export class AllowedGuard implements CanActivate {

  constructor(
    private _userControolerService: UserControllerService,
    private _router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._userControolerService.getUserLogged();
    let url = {
      edit: `${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.detail}`,
      add: `${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.add}`,
      report: `${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.management.report}`
    }
    if ((state.url.includes(url.edit) || (state.url.includes(url.add))) && !user.marcacaoExame) {
      this._router.navigate([`/${ROUTES_APLICATION.home}/${ROUTES_APLICATION.notAllowed}` ]);
      return false;
    }
    if (state.url.includes(url.report) && !user.relatorioMarcacao) {
      this._router.navigate([`/${ROUTES_APLICATION.home}/${ROUTES_APLICATION.notAllowed}` ]);
      return false;
    }
    return true;
  }
}
