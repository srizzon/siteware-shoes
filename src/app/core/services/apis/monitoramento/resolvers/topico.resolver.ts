import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { TopicoModel } from '@models/monitoramento/topico.model';
import { TopicoService } from '@services/apis/monitoramento/topico.service';

@Injectable({
  providedIn: 'root'
})
export class TopicoResolver implements Resolve<Observable<TopicoModel[]>> {

  constructor(
    private _service: TopicoService
  ) { }

  resolve(): Observable<TopicoModel[]> {
    return this._service.getAll();
  }
}
