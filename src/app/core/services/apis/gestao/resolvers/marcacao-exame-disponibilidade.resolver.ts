import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MarcacaoExameDisponibilidade } from '@core/models/gestao/marcacao-exame-disponibilidade.model';
import { MarcacaoExameDisponibilidadeService } from '../../gestao/marcacao-exame-disponibilidade.service';

@Injectable({ providedIn: 'root' })
export class MarcacaoExameDisponibilidadeResolver implements Resolve<Observable<MarcacaoExameDisponibilidade[]>> {

  constructor(
    private _service: MarcacaoExameDisponibilidadeService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<MarcacaoExameDisponibilidade[]> {
    return this._service.getAll();
  }
}
