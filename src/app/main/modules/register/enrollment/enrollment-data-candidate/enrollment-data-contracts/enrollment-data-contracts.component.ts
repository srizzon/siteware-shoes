import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import * as extenso from 'extenso';

import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { ContratoFinanceiroService } from '@services/apis/financeiro/contrato-financeiro.service';
import { GerenciaNetService } from '@services/apis/financeiro/gerencianet.service';
import { Helper } from '@utils/helper';
import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { RecibosService } from '@services/apis/documento/recibos.service';
import { SalesHitoricTableComponent, SalesHistoricInterface } from '@components/tables/sales-hitoric-table/sales-hitoric-table.component';
import { SalesSubjectService } from '@services/outros/sales-subject.service';
import { ServiceProvisionReceipt } from '@models/documento/service-provision-receipt.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { Toast } from '@core/services/outros/toast.service';
import { UserControllerService } from '@services/outros/user-controller.service';

@Component({
  selector: 'app-enrollment-data-contracts',
  templateUrl: './enrollment-data-contracts.component.html',
  styleUrls: ['./enrollment-data-contracts.component.scss']
})
export class EnrollmentDataContractsComponent implements OnInit, AfterViewInit {

  contratos: ContratoFinanceiroModel[] = new Array<ContratoFinanceiroModel>();
  tableData: TableCustom;
  matricula: MatriculaGestaoModel = new MatriculaGestaoModel();
  private _subscription: Subscription;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _contratoService: ContratoFinanceiroService,
    private _gerenciaNetService: GerenciaNetService,
    private _recibosService: RecibosService,
    private _toast: Toast,
    private _userControllerservice: UserControllerService,
    private _salesSubject: SalesSubjectService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._createTable();
  }

  ngAfterViewInit(): void {
    this._setById();
    this._observSalle();
  }

  cancel(contrato: ContratoFinanceiroModel) {
    if (contrato.carne) this._cancelBooklet(contrato);
    else if (contrato.boleto) this._cancelBillet(contrato);
    else this._toast.error('Cancelar');
  }

  private _observSalle(): void {
    this._salesSubject.getSales().subscribe(
      (res) => {
        if (res) {
          this._getContracts()
        }
      }
    )
  }

  private _cancelBillet(contrato: ContratoFinanceiroModel): void {
    console.log(contrato)
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Cancelamento de Boleto',
        subtitle: 'Tem certeza que deseja cancelar o boleto para:',
        descriptionFirst: 'Candidato',
        descriptionSecond: this.matricula.candidato.nome,
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const cnpjEmpresa = contrato.cnpjEmpresa;
          const boletoId = contrato.lancamentosFinanceiros[0].boletoId;
          this._gerenciaNetService.deleteBoleto(cnpjEmpresa, boletoId).subscribe(
            () => {
              this._getContracts();
              this._toast.success('Cancelar Boleto', 'Boleto cancelado com sucesso.')
            }
          );
        }
      })
    )
  }

  private _cancelBooklet(contrato: ContratoFinanceiroModel): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Cancelamento de Carnê',
        subtitle: 'Tem certeza que deseja cancelar o carnê para:',
        descriptionFirst: 'Candidato',
        descriptionSecond: this.matricula.candidato.nome,
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const cnpjEmpresa = contrato.cnpjEmpresa;
          const carneId = contrato.lancamentosFinanceiros[0].carneId;
          this._gerenciaNetService.deleteCarne(cnpjEmpresa, carneId).subscribe(
            () => {
              this._getContracts();
              this._toast.success('Cancelar Carnê', 'Carnê cancelado com sucesso.')
            }
          );
        }
      })
    )
  }

  private _check(element): boolean {
    return (element.situacaoContrato == 'C')
  }

  private _createTable(): void {
    this.tableData = {
      columns: ['descricao', 'valorPadrao', 'situacaoContrato', 'actions'],
      title: 'Lista de Contratos',
      data: [],
      result: {
        noData: 'Não foi encontrado contratos para o candidato.',
        defaultMessage: 'Não existe dados para serem exibidos.'
      },
      columnData: {
        descricao: {
          header: 'PRODUTO',
          type: TableColumnTypeEnum.STRING,
          element: 'descricaoProduto'
        },
        valorPadrao: {
          header: 'VALOR',
          type: TableColumnTypeEnum.STRING,
          element: 'valorGlobal',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        situacaoContrato: {
          header: 'STATUS',
          type: TableColumnTypeEnum.STRING,
          element: 'situacaoContrato',
          pipe: TablePipesTypeEnum.SITUATION_PAYMENT
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'stroked',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'edit',
              label: 'Histórico',
              onClick: (data) => this._showHistoric(data),
              disabled: (data) => this._check(data)
            },
            {
              icon: 'file_download',
              label: 'Baixar Arquivo',
              onClick: (data) => this._downloadFile(data),
              disabled: (data) => this._check(data)
            },
            {
              icon: 'delete',
              label: 'Cancelar cobrança',
              onClick: (data) => this.cancel(data),
              disabled: (data) => this._check(data)
            },
            {
              icon: 'description',
              label: 'Recibo',
              onClick: (data) => this._downloadReceipt(data),
              disabled: (data) => this._check(data)
            }
          ],
        },
      }
    }
  }

  private _getContracts(): void {
    const params = {
      cnpj: this._userControllerservice.getUserLogged().organizationCNPJ,
      matriculaId: this.matricula.id,
    };
    this._contratoService
      .getAll(params)
      .subscribe(res => this._updateContracts(res))
  }

  private _downloadReceipt(contrato: ContratoFinanceiroModel) {
    const serviceProvision: ServiceProvisionReceipt = {
      bairroAluno: 'N/A',
      cepAluno: 'N/A',
      cidadeAluno: 'N/A',
      cidadeEmpresa: this._userControllerservice.getUserLogged().organizationCidade,
      cnpjEmpresa: contrato.cnpjEmpresa,
      cpfAluno: this.matricula.candidato.cpf,
      creditos: [
        {
          credito: '45',
          lancamento: contrato.lancamentosFinanceiros[0].id,
          quantidade: contrato.contratoItens[0].quantidade,
          servico: contrato.descricaoProduto,
        },
      ],
      dataAtualExtenso: moment().format('DD/MM/YYYY HH:mm'),
      enderecoAluno: 'N/A',
      enderecoComplementoAluno: 'N/A',
      enderecoNumeroAluno: 'N/A',
      estadoAluno: 'N/A',
      estadoEmpresa: this._userControllerservice.getUserLogged().organizationEstado,
      nomeAluno: this.matricula.candidato.nome.trim(),
      numeroRecibo: contrato.id,
      parcelas: [
        {
          numDocumento: contrato.lancamentosFinanceiros[0].boletoId,
          dataPagamento: contrato.lancamentosFinanceiros[0].dataPagamento ? moment(contrato.lancamentosFinanceiros[0].dataPagamento).format('DD/MM/YYYY') : '-',
          observacao: '-',
          lancamento: contrato.lancamentosFinanceiros[0].id,
          dataVencimento: moment(contrato.lancamentosFinanceiros[0].dataVencimento).format('DD/MM/YYYY'),
          numeroParcela: contrato.id,
          formaPagamento: 'BOLETO',
          valor: contrato.lancamentosFinanceiros[0].valor,
        },
      ],
      quantidadeParcelas: contrato.parcelas,
      razaoSocialEmpresa: this._userControllerservice.getUserLogged().organizationNome,
      rgAluno: 'N/A',
      rgExpedidoEmAluno: 'N/A',
      rgExpedidoPorAluno: 'N/A',
      valorTotal: contrato.valorGlobal,
      valorTotalExtenso: extenso(contrato.valorGlobal.toFixed(2).toString().replace('.', ','), {
        mode: 'currency',
        currency: { type: 'BRL' }
      }
      ),
    };

    this._subscription.add(
      this._recibosService
        .getPrestacaoServicos(serviceProvision)
        .subscribe(
          (res) => {
            Helper.downloadBlobFile(
              `recibo-download-${moment().format('DD_MM_YYYY_HH_mm_ss')}`,
              res
            );
          }
        )
    )
  }

  private _downloadFile(element: ContratoFinanceiroModel): void {
    if (element.boleto) {
      window.open(element.boleto, '_blank');
    } else {
      this._toast.error('Baixar Arquivo', 'Não foi possível realizar o download do arquivo.');
    }
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.matricula = this._activatedRoute.snapshot.data['matricula'];
      let contracts: ContratoFinanceiroModel[] = this._activatedRoute.snapshot.data['contratos'];
      this._updateContracts(contracts);
    }
  }

  private _showHistoric(element: ContratoFinanceiroModel): void {
    this._dialog.open<SalesHitoricTableComponent, SalesHistoricInterface>(SalesHitoricTableComponent,
      {
        data: {
          contrato: element,
          candidate: this.matricula.candidato.nome,
        },
        width: '1000px'
      }
    );
  }

  private _updateContracts(contracts: ContratoFinanceiroModel[]): void {
    let cont: ContratoFinanceiroModel[] = contracts;
    cont.map(x => x.descricaoProduto = x.contratoItens[0].produto.descricao);
    this.contratos = cont;
    this._cdr.detectChanges();
  }
}
