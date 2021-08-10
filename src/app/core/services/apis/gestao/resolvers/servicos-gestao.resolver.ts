import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ServicoGestaoService } from '@services/apis/gestao/servico-gestao.service';
import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';

@Injectable({
  providedIn: 'root',
})
export class ServicosGestaoResolver implements Resolve<Observable<ServicoGestaoModel[]>> {

  constructor(
    private _service: ServicoGestaoService
  ) { }

  resolve(): Observable<ServicoGestaoModel[]> {
    return this._service.getAllServices();
  }
}
