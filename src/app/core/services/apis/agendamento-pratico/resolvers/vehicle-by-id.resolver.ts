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
export class VehicleByIdResolver implements Resolve<Observable<VehicleModel>> {

  constructor(
    private _service: VehicleService,
    private _toast: Toast
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VehicleModel> {
    return this._service
      .getById(route.params.id)
      .pipe(
        map(res => res),
        catchError(
          () =>  of(new VehicleModel())
        )
      )
  }
}
