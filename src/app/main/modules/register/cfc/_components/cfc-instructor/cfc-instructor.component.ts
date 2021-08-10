import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CfcModel } from '@models/gestao/cfc.model';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogLinkInstructorComponent } from './../dialog-link-instructor/dialog-link-instructor.component';
import { InstrutorCfcModel } from '@core/models/gestao/instrutor-cfc.model';
import { InstrutorCfcService } from '@services/apis/gestao/instrutor-cfc.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { Toast } from '@core/services/outros/toast.service';

@Component({
  selector: 'app-cfc-instructor',
  templateUrl: './cfc-instructor.component.html',
  styleUrls: ['./cfc-instructor.component.scss']
})
export class CfcInstructorComponent implements OnInit, AfterViewInit {

  cfc: CfcModel = new CfcModel();
  instructors: InstrutorCfcModel[] = new Array<InstrutorCfcModel>();
  tableCustom: TableCustom;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _instructorCfcService: InstrutorCfcService,
    private _router: Router,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this._createTable();
  }

  ngAfterViewInit(): void {
    this._setInstructos();
  }

  add(): void {
    this._router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.instructor}/${ROUTES_APLICATION.add}`]);
  }

  link(): void {
    this._dialog.open(DialogLinkInstructorComponent, {
      width: '600px'
    })
      .afterClosed()
      .subscribe(
        (res) => {
          if (res) {
            const payload = { 'instrutorId': res.id, 'cfcId': this.cfc.id }
            this._instructorCfcService.create(payload).subscribe(
              () => this._toast.success('Vincular', 'Instrutor Vinculado com sucesso.')
            )
          }
        }
      )
  }

  private _setInstructos(): void {
    if (this._activatedRoute.snapshot.params.cnpj) {
      this.instructors = this._activatedRoute.snapshot.data['instructors'];
      this.cfc = this._activatedRoute.snapshot.data['cfc'][0];
      this._cdr.detectChanges();
    }
  }

  private _unbind(instructor): void {
    this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Desvincular Instrutor',
        subtitle: `Tem certeza que deseja desvincular o instrutor ${instructor.instrutor.nome}`
      }
    }).afterClosed()
      .subscribe(
        (res) => {
          if (res) {
            this._instructorCfcService.delete(instructor.id).subscribe(
              () => this._toast.success('Desvincular', 'Instrutor desvinculado com sucesso.')
            )
          }
        })

  }

  private _createTable(): void {
    this.tableCustom = {
      columns: ['ativo', 'nome', 'cpf', 'telefone', 'email', 'actions'],
      title: 'Listagem de Instrutores',
      width: '82%',
      data: [],
      result: {
        noData: `Não existem instrutores cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os instrutores existentes.`
      },
      columnData: {
        ativo: {
          header: 'ATIVO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'instrutor.ativo',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        nome: {
          header: 'NOME',
          type: TableColumnTypeEnum.OBJECT,
          element: 'instrutor.nome',
        },
        cpf: {
          header: 'CPF',
          type: TableColumnTypeEnum.OBJECT,
          element: 'instrutor.cpf',
          pipe: TablePipesTypeEnum.CPF
        },
        telefone: {
          header: 'TELEFONE',
          type: TableColumnTypeEnum.OBJECT,
          element: 'instrutor.telefone',
        },
        email: {
          header: 'EMAIL',
          type: TableColumnTypeEnum.OBJECT,
          element: 'instrutor.email',
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'stroked',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'published_with_changes',
              label: 'DESVINCULAR',
              onClick: (data) => this._unbind(data),
            }
          ],
        },
      },
    };
  }
}
