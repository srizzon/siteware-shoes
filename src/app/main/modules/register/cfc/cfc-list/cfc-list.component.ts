import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CfcModel } from '@models/gestao/cfc.model';
import { DefaultMasks } from '@enums/default-masks.enum';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { FilterModel } from '@models/outros/filter.model';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

@Component({
  templateUrl: './cfc-list.component.html',
  styleUrls: ['./cfc-list.component.scss'],
})
export class CfcListComponent implements OnInit {

  tableData: TableCustom;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _filterService: FilterService,
    private _router: Router,
    private _servicesSubject: ServicesSubject,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription.add(
      this._servicesSubject.getCfcs().subscribe((res) => this.createTable(res))
    )
    this.createFilter();
  }

  addCfc(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute });
  }

  editCfc(cfc: CfcModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, cfc.cnpj], { relativeTo: this._activatedRoute });
  }

  createTable(cfcs): void {
    this.tableData = {
      columns: ['cfc', 'cnpj', 'unidadeDetran', 'codCfcDetran', 'codFilialDetran', 'actions'],
      title: 'Listagem de CFC',
      width: '99%',
      data: cfcs,
      result: {
        noData: `Não existem CFC's cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os CFC's existentes.`
      },
      columnData: {
        cfc: {
          header: 'CFC',
          type: TableColumnTypeEnum.STRING,
          element: 'nome',
        },
        cnpj: {
          header: 'CNPJ',
          type: TableColumnTypeEnum.STRING,
          element: 'cnpj',
          pipe: TablePipesTypeEnum.CNPJ
        },
        unidadeDetran: {
          header: 'UNID. DETRAN',
          type: TableColumnTypeEnum.STRING,
          element: 'unidadeDetranDescricao',
        },
        codCfcDetran: {
          header: 'COD. CFC DETRAN',
          type: TableColumnTypeEnum.STRING,
          element: 'codCfcDetran',
        },
        codFilialDetran: {
          header: 'COD. FILIAL DETRAN',
          type: TableColumnTypeEnum.STRING,
          element: 'codFilialDetran',
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'stroked',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'info',
              label: 'DETALHES',
              onClick: (data) => this.editCfc(data),
            }
          ],
        },
      },
    };
  }

  showFilter() {
    this._filterService.changeDisplay();
  }

  createFilter() {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cnpj',
          label: 'CNPJ CFC',
          mask: DefaultMasks.CNPJ
        },
      ];
    this._filterService.setFilters(filter)
  }
}
