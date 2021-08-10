import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { VeiculoModel } from '@models/gestao/veiculo.model';
@Component({
  selector: 'app-vehicle-page',
  templateUrl: './vehicle-page.component.html',
  styleUrls: ['./vehicle-page.component.scss']
})
export class VehiclePageComponent implements OnInit, OnDestroy {

  vehicleTable: TableCustom;
  vehicleData: VeiculoModel[] = new Array<VeiculoModel>();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _servicesSubject: ServicesSubject,
    private _cdr: ChangeDetectorRef
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initTable();
    this._loadVehicles();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  add(): void {
    this._router.navigate([ROUTES_APLICATION.add], { relativeTo: this._activatedRoute });
  }

  private _info(vehicle: VeiculoModel): void {
    this._router.navigate([ROUTES_APLICATION.detail, vehicle.id], { relativeTo: this._activatedRoute });
  }

  private _initTable(): void {
    this.vehicleTable = {
      columns: ['category', 'licencePlate', 'enabled', 'createdDate', 'updatedDate', 'actions'],
      result: {
        noData: `Não existem planos de aulas para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos planos de aulas.`,
      },
      width: '100%',
      data: [],
      columnData: {
        category: {
          type: TableColumnTypeEnum.STRING,
          element: 'categoria',
          header: 'CATEGORIA',
        },
        licencePlate: {
          type: TableColumnTypeEnum.STRING,
          element: 'placa',
          header: 'PLACA'
        },
        enabled: {
          type: TableColumnTypeEnum.STRING,
          element: 'ativo',
          header: 'ATIVO',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        createdDate: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataCadastro',
          header: 'DATA DE CRIAÇÃO',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
        },
        updatedDate: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataAlteracao',
          header: 'DATA DE ATUALIZAÇÃO',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'VISUALIZAR',
              onClick: (data) => this._info(data),
            }
          ]
        }
      }
    }
  }

  private _loadVehicles(): void {
    this._subscription.add(
      this._servicesSubject.getVeiculo()
        .subscribe(
          (res) => {
            this.vehicleData = res
            this._cdr.detectChanges();
          }
        )
    )
  }
}
