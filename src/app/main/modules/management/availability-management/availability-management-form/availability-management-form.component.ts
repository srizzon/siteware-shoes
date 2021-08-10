import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConstantModel } from '@core/models/outros/constant.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { Helper } from '@core/utils/helper';
import { MarcacaoExameDisponibilidade } from '@core/models/gestao/marcacao-exame-disponibilidade.model';
import { MarcacaoExameDisponibilidadeService } from '@core/services/apis/gestao/marcacao-exame-disponibilidade.service';
import { SituationEnum } from '@enums/situation.enum';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-availability-management-form',
  templateUrl: './availability-management-form.component.html',
  styleUrls: ['./availability-management-form.component.scss']
})
export class AvailabilityManagementFormComponent implements OnInit {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: false,
    enable: true,
    propertyId: 'id',
    propertyActive: 'ativoBySituacao',
    showButtons: true,
    update: true
  })
  disabled: boolean = true;
  form: FormGroup;
  marcacaoExameDisponibilidade: MarcacaoExameDisponibilidade = new MarcacaoExameDisponibilidade();
  tiposExames: ConstantModel[] = new Array<ConstantModel>();

  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _service: MarcacaoExameDisponibilidadeService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setEntityById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    //if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('horario').enable();
      this.form.get('codigoTurma').enable();
      this.form.get('quantidadeVagas').enable();
      this.form.get('tiposExames').enable();
      this.form.get('locaisExames').enable();
    } else {
      this.form.get('horario').disable();
      this.form.get('codigoTurma').disable();
      this.form.get('quantidadeVagas').disable();
      this.form.get('tiposExames').disable();
      this.form.get('locaisExames').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _create(): void {
    const formValues = this.form.getRawValue();
    this.marcacaoExameDisponibilidade.horario = formValues.horario;
    this.marcacaoExameDisponibilidade.codigoTurma = formValues.codigoTurma;
    this.marcacaoExameDisponibilidade.quantidadeVagas = formValues.quantidadeVagas;
    this.marcacaoExameDisponibilidade.exameId = formValues.tiposExames.id;
    this.marcacaoExameDisponibilidade.localId = formValues.locaisExames.id;
    this.marcacaoExameDisponibilidade.situacao = SituationEnum.ATIVO;

    this._subscription.add(
      this._service.create(this.marcacaoExameDisponibilidade).subscribe(
        (res) => {
          this.marcacaoExameDisponibilidade = res;
          this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Criação de Disponibilidade',
              subtitle: `O Horário ${res.horario} - Local ${formValues.locaisExames.descricao} - Exame ${formValues.tiposExames.descricao} foi criado com sucesso.`,
              onlyOkButton: true
            }
          });
        }
      )
    )
  }

  private _enable(): void {
    this.marcacaoExameDisponibilidade.situacao = this.marcacaoExameDisponibilidade.situacao === SituationEnum.ATIVO ? SituationEnum.INATIVO : SituationEnum.ATIVO;
    this._subscription.add(
      this._service.update(this.marcacaoExameDisponibilidade).subscribe(
        (res) => {
          if (this.marcacaoExameDisponibilidade.situacao == SituationEnum.ATIVO) {
            this._toast.success('Sucesso', 'Disponibilidade habilitada com sucesso.');
          } else {
            this._toast.success('Sucesso', 'Disponibilidade desabilitada com sucesso.');
          }
          this.marcacaoExameDisponibilidade = res;
          this._updateEntityForm();
          this._updateStatus();
        }
      )
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      status: [{ value: '', disabled: true }],
      horario: ['', [Validators.required]],
      codigoTurma: ['', [Validators.required]],
      quantidadeVagas: ['', [Validators.required]],
      locaisExames: ['', Validators.required],
      tiposExames: ['', Validators.required],
      id: [''],
    })
  }

  private _setEntityById() {
    if (this._activatedRoute.snapshot.params.id) {
      this.marcacaoExameDisponibilidade = this._activatedRoute.snapshot.data['disponibilidade'];
      this._updateStatus();
      this._updateEntityForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _update() {
    const formValues = this.form.getRawValue();
    const payload = new MarcacaoExameDisponibilidade();
    payload.id = this.marcacaoExameDisponibilidade.id;
    payload.horario = formValues.horario;
    payload.quantidadeVagas = formValues.quantidadeVagas;
    payload.situacao =  this.marcacaoExameDisponibilidade.situacao;

    this._subscription.add(
      this._service.update(payload).subscribe(
        (res) => {
          this.marcacaoExameDisponibilidade = res;
          this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Atualização de Disponiiblidade',
              subtitle: `O Horário ${res.horario} - Local ${res.local.descricao} - Exame ${res.exame.descricao} foi atualizado com sucesso.`,
              onlyOkButton: true
            }
          });
          this._changeEnableForm();
        })
    )
  }

  private _updateEntityForm(): void {
    this.form.get('horario').setValue(this.marcacaoExameDisponibilidade.horario);
    this.form.get('codigoTurma').setValue(this.marcacaoExameDisponibilidade.codigoTurma);
    this.form.get('quantidadeVagas').setValue(this.marcacaoExameDisponibilidade.quantidadeVagas);
    this.form.get('status').setValue(this.marcacaoExameDisponibilidade.status);
    this.form.get('tiposExames').setValue(this.marcacaoExameDisponibilidade.exame);
    this.form.get('locaisExames').setValue(this.marcacaoExameDisponibilidade.local);
  }

  private _updateStatus(): void {
    this.marcacaoExameDisponibilidade.ativoBySituacao = this.marcacaoExameDisponibilidade.situacao === SituationEnum.ATIVO;
  }
}
