import { Resolve  } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { UnidadeDetran } from '@models/gestao/unidade-detran.model';
import { UnidadeDetranService } from '@services/apis/gestao/unidade-detran.service';

@Injectable({
  providedIn: 'root',
})
export class UnidadeDetranResolver implements Resolve<Observable<UnidadeDetran[]>> {

  constructor(
    private _service: UnidadeDetranService
  ) { }

  resolve(): Observable<UnidadeDetran[]> {
    return this._service.getAll();
  }
}
