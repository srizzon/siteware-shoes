import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ProdutoService } from '@services/apis/financeiro/produto.service';
import { Produto } from '@models/financeiro/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutosPorIdResolver implements Resolve<Observable<Produto[]>> {

  constructor(
    private _service: ProdutoService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Produto[]> {
    return this._service
      .getById(route.params.id)
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<Produto>())
        )
      )
  }
}
