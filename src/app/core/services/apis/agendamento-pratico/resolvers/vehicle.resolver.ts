import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { VehicleModel } from '@models/agendamento-pratico/vehicle.model';
import { VehicleService } from './../vehicles.service';
import { Toast } from '@services/outros/toast.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleResolver implements Resolve<Observable<VehicleModel[]>> {

  constructor(
    private _service: VehicleService,
    private _toast: Toast
  ) { }

  resolve(): Observable<VehicleModel[]> {
    return this._service
      .getAll()
      .pipe(
        map(res => res),
        catchError(
          () => of(new Array<VehicleModel>())
        )
      )
  }
}
