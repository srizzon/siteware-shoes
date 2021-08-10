
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { GradeModel } from '@models/agendamento/grade.model';
import { GradesService } from '@services/apis/agendamento/grades.service';

@Injectable({
  providedIn: 'root'
})
export class GradePorIdResolver implements Resolve<Observable<GradeModel>> {

  constructor(private service: GradesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GradeModel> {
    const id = route.params.id;
    return this.service.getById(id);
  }
}
