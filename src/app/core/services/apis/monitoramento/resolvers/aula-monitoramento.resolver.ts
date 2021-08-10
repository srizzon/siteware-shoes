import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AulaMonitoramentoModel } from '@models/monitoramento/aula-monitoramento.model';
import { AulaMonitoramentoService } from '@services/apis/monitoramento/aula-monitoramento.service';

@Injectable({ providedIn: 'root' })
export class AulaMonitoramentoResolver implements Resolve<Observable<AulaMonitoramentoModel[]>> {

  constructor(
    private service: AulaMonitoramentoService
  ) { }

  resolve(): Observable<AulaMonitoramentoModel[]> {
      return this.service.getAll();
  }
}
