import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { SchedulePracticalsModel } from '@models/agendamento-pratico/schedule-practicals.model';
import { SchedulePracticalsService } from '../schedule-practicals.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulePracticalById implements Resolve<Observable<SchedulePracticalsModel>> {

  constructor(
    private _service: SchedulePracticalsService,
  ) { }

  SchedulePraticalsModel

  resolve(route: ActivatedRouteSnapshot): Observable<SchedulePracticalsModel> {
    return this._service
      .getById(route.params.id)
      .pipe(
        map(res => res),
        catchError(
          () => of(new SchedulePracticalsModel())
        )
      )
  }
}
