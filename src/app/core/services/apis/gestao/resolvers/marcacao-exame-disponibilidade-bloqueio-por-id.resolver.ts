import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MarcacaoExameDisponibilidadeBloqueio } from '@core/models/gestao/marcacao-exame-bloqueio-disponibilidade.model';
import { MarcacaoExameDisponibilidadeBloqueioService } from '../marcacao-exame-bloqueio-disponibilidade.service';

@Injectable({ providedIn: 'root' })
export class MarcacaoExameDisponibilidadeBloqueioPorIdResolver implements Resolve<Observable<MarcacaoExameDisponibilidadeBloqueio>> {

  constructor(
    private _service: MarcacaoExameDisponibilidadeBloqueioService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<MarcacaoExameDisponibilidadeBloqueio> {
    return this._service.getById(route.params.id);
  }
}
