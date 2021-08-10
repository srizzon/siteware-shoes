import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { MatriculaService } from '@services/apis/gestao/matricula.service';

@Injectable({
  providedIn: 'root',
})
export class MatriculaGestaoPorIdResolver implements Resolve<Observable<MatriculaGestaoModel>> {

  constructor(
    private _service: MatriculaService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<MatriculaGestaoModel> {
    if (route.params.id){
      return this._service.getById(route.params.id);
    }
    return null;
  }
}
