import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { CfcModel } from '@models/gestao/cfc.model';
import { Helper } from '@utils/helper';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

@Component({
  templateUrl: './cfc-page.component.html',
  styleUrls: ['./cfc-page.component.scss'],
})
export class CfcPageComponent implements OnInit, AfterViewInit {

  index: number = 0;
  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: false,
    delete: false,
    enable: false,
    propertyId: 'id',
    showButtons: true,
    update: false
  })
  cfc: CfcModel = new CfcModel();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  addCfc(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute });
  }

  ngAfterViewInit(): void {
    this._setCfcById();
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _setCfcById(): void {
    if (this._activatedRoute.snapshot.params.cnpj) {
      this.cfc = this._activatedRoute.snapshot.data['cfc'][0];
      this._cdr.detectChanges();
    }
  }
}
