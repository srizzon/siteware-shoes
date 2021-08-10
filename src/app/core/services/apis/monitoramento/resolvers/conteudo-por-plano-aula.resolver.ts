import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ConteudoModel } from '@models/monitoramento/conteudo.model';
import { PlanoAulaService } from '@services/apis/monitoramento/plano-aula.service';

@Injectable({ providedIn: 'root' })
export class ConteudoPorPlanoDeAulaResolver implements Resolve<Observable<ConteudoModel[]>> {

  constructor(
    private _service: PlanoAulaService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ConteudoModel[]> {
    if (route.params.id){
      return this._service.listarConteudosPorPlanoAula(route.params.id);
    }
    return null;
  }
}
