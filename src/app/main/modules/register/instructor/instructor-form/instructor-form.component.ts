import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { Helper } from '@utils/helper';
import { InstrutorModel } from '@models/gestao/instrutor.model';
import { InstrutorService } from '@services/apis/gestao/instrutor.service';
import { Toast } from '@services/outros/toast.service';
@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit {

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
  instructor: InstrutorModel = new InstrutorModel();
  instructorForm: FormGroup;
  imageFace = './assets/images/png/foto.png';
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _instructorService: InstrutorService,
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
    this._setInstructorById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  private _create(): void {
    const payload: InstrutorModel = this.instructorForm.getRawValue();
    this._subscription.add(
      this._instructorService.create(payload).subscribe(
        (res) => {
          this.instructor = res;
          this._updateInstructorForm();
          this._toast.success('Instrutor', 'Instrutor adicionado com sucesso.')
        }
      )
    )
  }

  private _update(): void {
    const payload: InstrutorModel = this.instructorForm.getRawValue();
    payload.id = this.instructor.id;
    this._subscription.add(
      this._instructorService.update(payload).subscribe(
        (res) => {
          this.instructor = res;
          this._updateInstructorForm();
          this._toast.success('Instrutor', 'Instrutor editado com sucesso.')
        }
      )
    )
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.instructorForm.get('ativo').enable();
      this.instructorForm.get('cpf').enable();
      this.instructorForm.get('email').enable();
      this.instructorForm.get('emailReuniao').enable();
      this.instructorForm.get('categoria').enable();
      this.instructorForm.get('idTipoInstrutor').enable();
      this.instructorForm.get('nome').enable();
      this.instructorForm.get('telefone').enable();
    } else {
      this.instructorForm.get('ativo').disable();
      this.instructorForm.get('cpf').disable();
      this.instructorForm.get('email').disable();
      this.instructorForm.get('emailReuniao').disable();
      this.instructorForm.get('categoria').disable();
      this.instructorForm.get('idTipoInstrutor').disable();
      this.instructorForm.get('nome').disable();
      this.instructorForm.get('telefone').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }


  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Deletar Instrutor',
        subtitle: 'Ao excluir um instrutor ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão do instrutor:',
        descriptionSecond: this.instructor.nome
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._instructorService.delete(this.instructor.id).subscribe(
            () => {
              this._toast.success('Deletar Instrutor');
              this._back();
            }
          )
        }
      })
    )
  }


  private _enable(): void {
    this.instructor.ativo = !this.instructor.ativo;
    this._subscription.add(
      this._instructorService.update(this.instructor).subscribe(
        (res) => {
          if (this.instructor.ativo) {
            this._toast.success('Habilitar Instrutor');
          } else {
            this._toast.success('Desabilitar Instrutor');
          }
          this.instructor = res;
          this._updateInstructorForm();
        }
      )
    )
  }

  private _initForm(): void {
    this.instructorForm = this._formBuilder.group({
      ativo:            [{ value: '', disabled: true }],
      cpf:              ['', [Validators.required]],
      email:            ['', [Validators.required, Validators.email]],
      emailReuniao:     ['', [Validators.required, Validators.email]],
      categoria:        ['', [Validators.required]],
      idTipoInstrutor:  ['', [Validators.required]],
      img_face:         [''],
      nome:             ['', [Validators.required]],
      telefone:         ['', [Validators.required]],
    })
  }

  private _updateInstructorForm(): void {
    this.instructorForm.get('ativo').setValue(this.instructor.ativo ? 'ATIVO' : 'INATIVO');
    this.instructorForm.get('cpf').setValue(this.instructor.cpf);
    this.instructorForm.get('email').setValue(this.instructor.email);
    this.instructorForm.get('emailReuniao').setValue(this.instructor.emailReuniao);
    this.instructorForm.get('categoria').setValue(this.instructor.idExterno);
    this.instructorForm.get('idTipoInstrutor').setValue(this.instructor.idTipoInstrutor);
    this.instructorForm.get('nome').setValue(this.instructor.nome);
    this.instructorForm.get('telefone').setValue(this.instructor.telefone);

    if (this.instructor.img_face) {
      this.imageFace = Helper.imageToFront(this.instructor.img_face);
    }
  }

  private _setInstructorById() {
    if (this._activatedRoute.snapshot.params.cpf) {
      this.instructor = this._activatedRoute.snapshot.data['instructor'][0];
      this._updateInstructorForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }
}
