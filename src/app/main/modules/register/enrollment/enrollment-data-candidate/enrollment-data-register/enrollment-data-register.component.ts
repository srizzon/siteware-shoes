import { Router } from '@angular/router';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import * as extenso from 'extenso';

import { CfcModel } from '@models/gestao/cfc.model';
import { CfcService } from '@services/apis/gestao/cfc.service';
import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { ContratoDocumentoService } from '@services/apis/documento/contrato-documento.service';
import { ConfirmCommentsDialogComponent, ConfirmCommentsDialogInterface } from '@components/dialogs/confirm-comments-dialog/confirm-comments-dialog.component';
import { Helper } from '@utils/helper';
import { ImageCroppComponent } from '@components/image-cropp/image-cropp.component';
import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { MatriculaService } from '@services/apis/gestao/matricula.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServiceProvisionContract } from '@models/documento/service-provision-contract.model';
import { Toast } from '@services/outros/toast.service';
import { ContratoFinanceiroService } from '@core/services/apis/financeiro/contrato-financeiro.service';

@Component({
  selector: 'app-enrollment-data-register',
  templateUrl: './enrollment-data-register.component.html',
  styleUrls: ['./enrollment-data-register.component.scss'],
})

export class EnrollmentDataRegisterComponent implements OnInit, OnChanges {

  @Input() enrollment: MatriculaGestaoModel;
  form: FormGroup;
  loadingImage: boolean = false;
  imageUser: string = './assets/images/png/foto.png';
  matricula: MatriculaGestaoModel = new MatriculaGestaoModel();

  constructor(
    private _cfcService: CfcService,
    private _contratoDocumentoService: ContratoDocumentoService,
    private _contratoFinanceiroService: ContratoFinanceiroService,
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _matriculaService: MatriculaService,
    private _toast: Toast,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.enrollment && changes.enrollment.currentValue) {
      this.matricula = changes.enrollment.currentValue;
      this._initForm(changes.enrollment.currentValue);
    }
  }

  //ajustar
  onSubmit() {
    // const values: EnrollmentForm = this.form.getRawValue();

    // let payloadupdate = {
    //   candidatoId: this.enrollment.candidatoId,
    //   candidatoTelefone: values.telefone,
    //   candidatoEmail: values.email,
    //   cfcId: this.enrollment.cfcId,
    //   status: this.enrollment.status,
    // };
    // this.matriculaService.update(payloadupdate).subscribe(
    //   (data) => this.toast.success('Matricula'),
    //   () => this.toast.error('Matricula')
    // );
  }

  private _initForm(matricula?: MatriculaGestaoModel) {
    this.form = this._formBuilder.group({
      numero: [{ value: matricula ? matricula.numero : '' }],
      candidatoName: [{ value: matricula ? matricula.candidatoName : '' }],
      candidatoCpf: [{ value: matricula ? matricula.candidatoCpf : '' }],
      cfcNome: [{ value: matricula ? matricula.cfcNome : '', disabled: true }],
      dataCadastro: [{ value: matricula ? matricula.dataCadastro : '' }],
      renach: [{ value: matricula && matricula.processo ? matricula.processo.renach : '' }],
      servico: [{ value: matricula && matricula.processo && matricula.processo.servico ? matricula.processo.servico.nome : '' }],
      ativo: [{ value: matricula ? matricula.ativo : '' }],
      categoriaCnh: [{ value: matricula && matricula.processo && matricula.processo.categoriaCnh ? matricula.processo.categoriaCnh.categoria : '', disabled: true }, Validators.required],
      candidatoTelefone: [{ value: matricula ? matricula.candidatoTelefone : '', disabled: true }, Validators.required],
      candidatoEmail: [{ value: matricula ? matricula.candidatoEmail : '', disabled: true }, Validators.required],
      dandidatoEndereco: [{ value: '', disabled: true }],
      image: [matricula ? matricula.candidato.img_face : ''],
    });
  }

  changePhoto(event) {
    this._matDialog
      .open(ImageCroppComponent, { width: 'auto', data: {} })
      .afterClosed()
      .subscribe((image: { imageData: any; extension: string }) => {
        if (image) {
          this.form
            .get('image')
            .setValue(Helper.imageToBack(image.imageData.base64));
          this.imageUser = image.imageData.base64;
        }
      });
    event.preventDefault();
  }

  delete(): void {
    let nomeCandidato = this.matricula.candidato ? this.matricula.candidato.nome : 'N/A';
    const dialogRef = this._matDialog.open<ConfirmCommentsDialogComponent, ConfirmCommentsDialogInterface>(ConfirmCommentsDialogComponent, {
      data: {
        title: 'Cancelar Matricula',
        text: `Informe o motivo do cancelamento da matricula ${this.matricula.numero} referente ao candidato ${nomeCandidato}`,
        comments: '',
      },
      width: '520px',
      minHeight: '330px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = <ConfirmCommentsDialogInterface>result;
        this._matriculaService
          .cancel(this.matricula.id, data.comments)
          .subscribe(
            (res) => {
              this._toast.success('Cancelar Matricula')
              setTimeout(() => {
                this._router.navigate([`${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}`])
              }, 1000);
            }
          );
      }
    });
  }

  downloadContract() {
    this._cfcService.getCfcById(this.matricula.cfcId.toString()).subscribe((resCfc: CfcModel[]) => {
      const cfc = resCfc[0];

      const params = {
        cnpj: cfc.cnpj,
        cpf: this.matricula.candidatoCpf,
      };

      this._contratoFinanceiroService.getAll(params).subscribe((resContrato: ContratoFinanceiroModel[]) => {
        const contrato = resContrato[0];
        const serviceProvision: ServiceProvisionContract = {
          agencia: 'N/A',
          bairroAluno: 'N/A',
          bairroEmpresa: cfc.bairro,
          cidadeAluno: 'N/A',
          cidadeEmpresa: cfc.cidade,
          cnpjEmpresa: cfc.cnpj,
          conta: 'N/A',
          cpfAluno: this.matricula.candidato.cpf,
          dataAtualExtenso: moment().format('DD/MM/YYYY HH:mm'),
          dataParcela: 'N/A',
          enderecoAluno: 'N/A',
          enderecoComplementoAluno: 'N/A',
          enderecoComplementoEmpresa: cfc.complemento,
          enderecoEmpresa: cfc.logradouro,
          enderecoNumeroAluno: 'N/A',
          enderecoNumeroEmpresa: cfc.numero,
          estadoAluno: 'N/A',
          estadoCivilAluno: 'N/A',
          estadoEmpresa: cfc.estado,
          nomeAluno: this.matricula.candidato.nome,
          profissaoAluno: 'N/A',
          razaoSocialEmpresa: cfc.razaoSocial,
          rgAluno: 'N/A',
          rgExpedidoEmAluno: 'N/A',
          rgExpedidoPorAluno: 'N/A',
          valorDemaisParcelas: 0,
          valorDemaisParcelasExtenso: 'N/A',
          valorPrimeiraParcela: contrato ? contrato.valorParcelas : 0,
          valorPrimeiraParcelaExtenso: 'N/A',
          valorTaxaExamePratico: 0,
          valorTaxaReprovacao: 0,
          valorTaxaUsoCarro: 0,
          valorTotal: contrato ? contrato.valorGlobal : 0,
          valorTotalExtenso: contrato ? extenso(contrato.valorGlobal.toString(), { mode: 'currency' }) : 'N/A'
        }

        this._contratoDocumentoService.getPrestacaoServicos(serviceProvision).subscribe((res) => {
          Helper.downloadBlobFile(`contrato-download-${moment().format('DD_MM_YYYY_HH_mm_ss')}`, res);
        });
      });
    });
  }

  editCandidate(): void {
    this._router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}/${ROUTES_APLICATION.detail}`, this.matricula.id]);
  }
}
