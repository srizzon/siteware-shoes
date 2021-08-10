import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CfcModel } from '@models/gestao/cfc.model';
import { CfcService } from '@services/apis/gestao/cfc.service';

@Injectable({
  providedIn: 'root',
})
export class CfcPorCnpjResolver implements Resolve<Observable<CfcModel[]>> {

  constructor(
    private _service: CfcService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CfcModel[]> {
    return this._service.getAllCfcs({ cnpj: route.params.cnpj });
  }
}
