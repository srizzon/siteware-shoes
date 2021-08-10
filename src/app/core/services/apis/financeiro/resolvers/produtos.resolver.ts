import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Produto } from '@models/financeiro/produto.model';
import { ProdutoService } from '@services/apis/financeiro/produto.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutosResolver implements Resolve<Observable<Produto[]>> {

  constructor(
    private _service: ProdutoService
  ) { }

  resolve(): Observable<Produto[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<Produto>())
        )
      )
  }
}
