import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CfcModel } from '@models/gestao/cfc.model';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { UserControllerService } from '@services/outros/user-controller.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _servicesSubject: ServicesSubject,
    private _userControllerService: UserControllerService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription.add(
      this._activatedRoute.params.subscribe(
        () => {
          let cfcs: CfcModel[] = this._activatedRoute.snapshot.data['cfcs'];
          const cfcLogged = cfcs.filter(x => x.cnpj == this._userControllerService.getUserLogged().organizationCNPJ);
          const user = this._userControllerService.getUserLogged();
          user.cfc = cfcLogged[0];
          this._userControllerService.setUser(user);
          this._userControllerService.setCfc(cfcLogged[0])
          if (!this._userControllerService.isAdmin()) {
            cfcs = cfcLogged;
          }
          this._servicesSubject.setCfc(cfcs);
          this._servicesSubject.setInstrutor(this._activatedRoute.snapshot.data['instrutores']);
          this._servicesSubject.setLocal(this._activatedRoute.snapshot.data['locais']);
          this._servicesSubject.setServicos(this._activatedRoute.snapshot.data['servicos']);
          this._servicesSubject.setTipoExame(this._activatedRoute.snapshot.data['tipoExames']);
          this._servicesSubject.setUnidadeDetran(this._activatedRoute.snapshot.data['unidadeDetran']);
          this._servicesSubject.setVeiculo(this._activatedRoute.snapshot.data['veiculos']);
          this._servicesSubject.setServicoAgendamento(this._activatedRoute.snapshot.data['servicosAgendamento']);
          this._servicesSubject.setInstrutorAgendamento(this._activatedRoute.snapshot.data['instrutoresAgendamento']);
          this._servicesSubject.setCfcAgendamento(this._activatedRoute.snapshot.data['cfcsAgendamento']);
          this._servicesSubject.setCursoAgendamento(this._activatedRoute.snapshot.data['cursosAgendamento']);
        }
      )
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
