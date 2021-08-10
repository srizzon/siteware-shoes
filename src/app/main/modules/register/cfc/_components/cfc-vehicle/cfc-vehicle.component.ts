import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

import { CfcModel } from '@models/gestao/cfc.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogLinkVehicleComponent } from './../dialog-link-vehicle/dialog-link-vehicle.component';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { Toast } from '@core/services/outros/toast.service';
import { VeiculoCfcModel } from '@models/gestao/veiculo-cfc.model';
import { VeiculoCfcService } from '@services/apis/gestao/veiculo-cfc.service';

@Component({
  selector: 'app-cfc-vehicle',
  templateUrl: './cfc-vehicle.component.html',
  styleUrls: ['./cfc-vehicle.component.scss']
})
export class CfcVehicleComponent implements OnInit {

  vehicles: VeiculoCfcModel[] = new Array<VeiculoCfcModel>();
  tableCustom: TableCustom;
  cfc: CfcModel = new CfcModel();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _vehicleCfcService: VeiculoCfcService,
    private _router: Router,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this._createTable();
  }

  ngAfterViewInit(): void {
    this._setVehicles();
  }

  private _setVehicles(): void {
    if (this._activatedRoute.snapshot.params.cnpj) {
      this.vehicles = this._activatedRoute.snapshot.data['vehicles'];
      this.cfc = this._activatedRoute.snapshot.data['cfc'][0];
      this._cdr.detectChanges();
    }
  }

  add(): void {
    this._router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.vehicle}/${ROUTES_APLICATION.add}`]);
  }

  link(): void {
    this._dialog.open(DialogLinkVehicleComponent)
      .afterClosed()
      .pipe(
        tap((res: VeiculoCfcModel) => {
          const payload = {
            "instrutorId": res.id,
            "cfcId": this.cfc.id
          }
          return this._vehicleCfcService.create(payload)
      }))
      .subscribe(
        () => this._toast.success('Vincular', 'Instrutor Vinculado com sucesso.')
      )
  }

  private _unbind(vehicle: VeiculoCfcModel): void {
    this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Desvincular Veículo',
        subtitle: `Tem certeza que deseja desvincular o veículo ${vehicle.veiculo.placa}`
      }
    }).afterClosed()
      .subscribe(
        (res) => {
          if (res) {
            console.log(res)
          }
        })

  }

  private _createTable(): void {
    this.tableCustom = {
      columns: ['ativo', 'placa', 'categoria', 'dataCadastro', 'dataAlteracao', 'actions'],
      title: 'Listagem de Veículos',
      width: '82%',
      data: [],
      result: {
        noData: `Não existem veículos cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os veículos existentes.`
      },
      columnData: {
        ativo: {
          header: 'ATIVO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'veiculo.ativo',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        placa: {
          header: 'PLACA',
          type: TableColumnTypeEnum.OBJECT,
          element: 'veiculo.placa',
        },
        categoria: {
          header: 'CATEGORIA',
          type: TableColumnTypeEnum.OBJECT,
          element: 'veiculo.categoria',
        },
        dataCadastro: {
          header: 'DATA CADASTRO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'veiculo.dataCadastro',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
        },
        dataAlteracao: {
          header: 'DATA ALTERAÇÃO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'veiculo.dataAlteracao',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
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
