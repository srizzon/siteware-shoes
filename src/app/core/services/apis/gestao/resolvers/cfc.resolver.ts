import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CfcModel } from '@models/gestao/cfc.model';
import { CfcService } from '@services/apis/gestao/cfc.service';

@Injectable({
  providedIn: 'root',
})
export class CfcResolver implements Resolve<Observable<CfcModel[]>> {

  constructor(
    private cfcService: CfcService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CfcModel[]> {
    return this.cfcService.getAllCfcs()
  }
}
