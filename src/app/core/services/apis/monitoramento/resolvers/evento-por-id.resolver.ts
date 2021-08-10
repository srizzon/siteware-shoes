import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { EventoModel } from '@models/monitoramento/evento.model';
import { EventoService } from '@services/apis/monitoramento/evento.service';
import { Toast } from '@services/outros/toast.service';

@Injectable({ providedIn: 'root' })
export class EventoPorIdResolver implements Resolve<Observable<EventoModel[]>> {

  constructor(
    private _service: EventoService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<EventoModel[]> {
    return this._service
      .getAll({ aulaId: route.params.id })
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<EventoModel>())
        )
      )
  }
}
