import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';

import * as moment from 'moment';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { CfcModel } from '@models/gestao/cfc.model';
import { Helper } from '@utils/helper';
import { MatriculaGestaoModel, MatriculaRequest } from '@models/gestao/matricula-gestao.model';
import { MatriculaService } from '@services/apis/gestao/matricula.service';
import { Processo } from '@models/gestao/processo.model';
import { ProcessosService } from '@services/apis/gestao/processos.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Toast } from '@services/outros/toast.service';

export interface EnrollmentForm {
  id: number;
  image: string;
  name: string;
  cpf: string;
  dateOfBirth: Date;
  email: string;
  telefone: string;
  comments: string;
  cfc: CfcModel;
  renachProcessoAtual: string;
}

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
})
export class EnrollmentFormComponent implements OnInit, OnDestroy, AfterViewInit {


  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: false,
    enable: true,
    propertyId: 'id',
    propertyActive: 'ativo',
    showButtons: true,
    update: true
  })
  disabled: boolean = true;
  enrollment: MatriculaGestaoModel = new MatriculaGestaoModel();
  form: FormGroup;
  imageUser = './assets/images/png/foto.png';
  loadingImage = false;
  maxDate = new Date();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _matriculaService: MatriculaService,
    private _processosService: ProcessosService,
    private _router: Router,
    private _toast: Toast,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this._setDataById();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    //if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    //if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }


  private _create(): void {
    let payload: MatriculaRequest = new MatriculaRequest();
    const values: EnrollmentForm = this.form.getRawValue();

    payload.id = values.id;
    payload.nomeCandidato = values.name;
    payload.cpf = values.cpf;
    payload.dataAniversario = values.dateOfBirth;
    payload.email = values.email;
    payload.cnpj = values.cfc.cnpj;
    payload.telefone = values.telefone;
    payload.observacao = values.comments;

    this._subscription.add(
      this._matriculaService.create(payload).subscribe(
        (data: any) => {
          this._toast.success('Matricula');
          let route = `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}/${ROUTES_APLICATION.register.enrollmentData}/${data.id}/${data.candidato.cpf}`;
          this._router.navigate([route]);
        }
      )
    )
  }

  queryProcess() {
    const values: EnrollmentForm = this.form.getRawValue();
    this._processosService.getFromDetran(values.cpf).subscribe((res: Processo) => {
      if (res) {
        this.fillProcessForm(res);
      }
    });
  }

  fillProcessForm(process: Processo) {
    this.cleanProcessForm();

    if (process.renach) {

      if (process.candidatoNome) {
        this.form.get('name').setValue(process.candidatoNome);
        this.form.controls['name'].disable();
      }

      this.form.get('dataAberturaRenachProcessoAtual').setValue(moment(process.dataAberturaRenach, 'YYYY/MM/DD').format('DD/MM/YYYY'));
      this.form.get('dataVencimentoRenachProcessoAtual').setValue(moment(process.dataVencimentoRenach, 'YYYY/MM/DD').format('DD/MM/YYYY'));
      this.form.get('renachProcessoAtual').setValue(process.renach);
      this.form.get('observacaoProcessoAtual').setValue(process.observacao);
      this.form.get('situacaoProcessoAbert').setValue(process.situacao);
      if (process.categoriaCnh) { this.form.get('categoriaProcessoAtual').setValue(process.categoriaCnh.categoria); }
      if (process.servico) { this.form.get('servicoProcessoAtual').setValue(process.servico.nome); }
    }
  }

  cleanProcessForm() {
    this.form.get('dataAberturaRenachProcessoAtual').setValue('');
    this.form.get('dataVencimentoRenachProcessoAtual').setValue('');
    this.form.get('renachProcessoAtual').setValue('');
    this.form.get('observacaoProcessoAtual').setValue('');
    this.form.get('situacaoProcessoAbert').setValue('');
    this.form.get('categoriaProcessoAtual').setValue('');
    this.form.get('servicoProcessoAtual').setValue('');
  }

  private _back() {
    if (!this._activatedRoute.snapshot.params.id) {
      this._router.navigate([`${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}`])
    } else {
      this._router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}/${ROUTES_APLICATION.register.enrollmentData}`, this.enrollment.id, this.enrollment.candidato.cpf]);
    }
  }


  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('name').enable();
      this.form.get('dateOfBirth').enable();
      this.form.get('email').enable();
      this.form.get('comments').enable();
      this.form.get('telefone').enable();
      this.form.get('cfc').enable();
      this.form.get('situacaoProcessoAbert').enable();
      this.form.get('renachProcessoAtual').enable();
      this.form.get('observacaoProcessoAtual').enable();
      this.form.get('servicoProcessoAtual').enable();
      this.form.get('categoriaProcessoAtual').enable();
      this.form.get('dataAberturaRenachProcessoAtual').enable();
      this.form.get('dataVencimentoRenachProcessoAtual').enable();
    } else {
      this.form.get('name').disable();
      this.form.get('dateOfBirth').disable();
      this.form.get('email').disable();
      this.form.get('comments').disable();
      this.form.get('telefone').disable();
      this.form.get('cfc').disable();
      this.form.get('situacaoProcessoAbert').disable();
      this.form.get('renachProcessoAtual').disable();
      this.form.get('observacaoProcessoAtual').disable();
      this.form.get('servicoProcessoAtual').disable();
      this.form.get('categoriaProcessoAtual').disable();
      this.form.get('dataAberturaRenachProcessoAtual').disable();
      this.form.get('dataVencimentoRenachProcessoAtual').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }



  initForm() {
    this.form = this._formBuilder.group({
      id: [''],
      image: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      comments: [''],
      telefone: ['', [Validators.required]],
      cfc: ['', [Validators.required]],
      situacaoProcessoAbert: [''],
      renachProcessoAtual: [''],
      observacaoProcessoAtual: [''],
      servicoProcessoAtual: [''],
      categoriaProcessoAtual: [''],
      dataAberturaRenachProcessoAtual: [''],
      dataVencimentoRenachProcessoAtual: [''],
    });
  }

  public changePhoto() {
    // this.matDialog
    //   .open(ImageCroppComponent, {
    //     width: 'auto',
    //     data: {},
    //   })
    //   .afterClosed()
    //   .subscribe((image: { imageData: any; extension: string }) => {
    //     if (image) {
    //       this.form
    //         .get('image')
    //         .setValue(Helper.imageToBack(image.imageData.base64));
    //       this.imageUser = image.imageData.base64;
    //     }
    //   });

  }

  private _update(): void {
    const values: EnrollmentForm = this.form.getRawValue();
    let payloadupdate = {
      id: values.id,
      candidatoId: this.enrollment.candidatoId,
      candidatoName: values.name,
      candidatoCpf: this.enrollment.candidatoCpf,
      candidatoDataAniversario: values.dateOfBirth,
      candidatoTelefone: values.telefone,
      candidatoEmail: values.email,
      cfcId: values.cfc.id,
      cfcNome: values.cfc.nome,
      cfcCnpj: values.cfc.cnpj,
      status: this.enrollment.status,
      observacao: values.comments
    }

    this._subscription.add(
      this._matriculaService.update(payloadupdate).subscribe(
        (data: any) => {
          this._toast.success('Matricula');
          let route = `/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}/${ROUTES_APLICATION.register.enrollmentData}/${data.id}/${data.candidatoCpf}`;
          this._router.navigate([route]);
        }
      )
    )
  }

  private _setDataById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.enrollment = this._activatedRoute.snapshot.data['enrollment'];
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private  _updateForm() {
    this.form.get('id').setValue(this.enrollment.id);
    this.form.get('image').setValue(this.enrollment.candidato.img_face);
    this.form.get('name').setValue(this.enrollment.candidato.nome);
    this.form.get('cpf').setValue(this.enrollment.candidato.cpf);
    this.form.get('dateOfBirth').setValue(this.enrollment.candidato.dataAniversario);
    this.form.get('email').setValue(this.enrollment.candidato.email);
    this.form.get('comments').setValue(this.enrollment.observacao);
    this.form.get('telefone').setValue(this.enrollment.candidatoTelefone);
    this.form.get('cfc').setValue(this.enrollment.cfcId);
    this.form.get('situacaoProcessoAbert').setValue(this.enrollment.processo.situacao);
    this.form.get('renachProcessoAtual').setValue(this.enrollment.processo.renach);
    this.form.get('observacaoProcessoAtual').setValue(this.enrollment?.processo?.observacao);
    this.form.get('servicoProcessoAtual').setValue(this.enrollment?.processo?.servico?.nome);
    this.form.get('categoriaProcessoAtual').setValue(this.enrollment?.processo?.categoriaCnh?.categoria);
    this.form.get('dataAberturaRenachProcessoAtual').setValue(this.enrollment?.processo?.dataAberturaRenach);
    this.form.get('dataVencimentoRenachProcessoAtual').setValue(this.enrollment?.processo?.dataVencimentoRenach);
    if (this.enrollment && this.enrollment.candidato.img_face) {
      this.imageUser = Helper.imageToFront(this.enrollment.candidato.img_face);
    }
    if (this.enrollment.id) {
      this.form.get('cpf').disable();
    }
  }

}
