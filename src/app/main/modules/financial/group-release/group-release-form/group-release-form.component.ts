import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { GrupoLancamentoModel } from '@models/financeiro/grupo-lancamento.model';
import { GrupoLancamentoService } from '@services/apis/financeiro/grupo-lancamento.service';
import { Helper } from '@utils/helper';
import { Toast } from '@services/outros/toast.service';

@Component({
  templateUrl: './group-release-form.component.html',
  styleUrls: ['./group-release-form.component.scss']
})
export class GroupReleaseFormComponent implements OnInit, OnDestroy, AfterViewInit {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: true,
    propertyId: 'id',
    propertyActive: 'ativo',
    showButtons: true,
    update: true
  })
  disabled: boolean = true;
  form: FormGroup;
  groupRelease: GrupoLancamentoModel = new GrupoLancamentoModel();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _groupReleaseService: GrupoLancamentoService,
    private _toast: Toast,
    private _router: Router
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }


  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _enable(): void {
    this.groupRelease.ativo = !this.groupRelease.ativo;
    this._subscription.add(
      this._groupReleaseService.update(this.groupRelease).subscribe(
        (res) => {
          if (this.groupRelease.ativo) {
            this._toast.success('Sucesso', 'Grupo de lançamento habilitado com sucesso.');
          } else {
            this._toast.success('Sucesso', 'Grupo de lançamento desabilitado com sucesso.');
          }
          this.groupRelease = res;
          this._updateForm();
        }
      )
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      ativo: [{value: false, disabled: true}],
      id: [''],
      descricao: ['', Validators.required],
    });

  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      const id = this._activatedRoute.snapshot.params.id;
      const groups: GrupoLancamentoModel[] = this._activatedRoute.snapshot.data['groupRelease'];
      this.groupRelease = groups.find(x => x.id == id);
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _updateForm() {
    this.form.patchValue({
      id: this.groupRelease.id,
      descricao: this.groupRelease.descricao,
      ativo: this.groupRelease.ativo
    });
    this._cdr.detectChanges();
  }

  private _create(): void {

    const values = this.form.getRawValue();

    const releaseGroup: GrupoLancamentoModel = {
      descricao: values.descricao,
      ativo: false
    };

    this._subscription.add(
      this._groupReleaseService.create(releaseGroup).subscribe(
        (res) => {
          this.groupRelease = Object.assign({},res);
          this._toast.success('Grupo', 'Grupo criado com sucesso');
          this._updateForm();
          this._changeEnableForm();
        }
      )
    )
  }

  private _update(): void {
    const values = this.form.getRawValue();

    const releaseGroup: GrupoLancamentoModel = {
      id: this.groupRelease.id,
      ...values
    };

    this._subscription.add(
      this._groupReleaseService.update(releaseGroup).subscribe(
        (res) => {
          this.groupRelease = Object.assign({},res);
          this._toast.success('Grupo', 'Grupo atualizado com sucesso');
          this._updateForm();
          this._changeEnableForm();
        }
      )
    )
  }

  private _delete(): void {
    this._subscription.add(
      this._groupReleaseService.delete(this.groupRelease.id).subscribe(
        () => {
          this._toast.success('Grupo', 'Grupo removido com sucesso')
          this._back();
        }
      )
    )
  }
}
