import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { DefaultMasks } from '@enums/default-masks.enum';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { FilterModel } from '@models/outros/filter.model';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';
import { UsuarioIdentidadeModel } from '@models/identidade/usuario-identidade.model';
import { UsuarioService } from '@services/apis/identidade/usuario.service';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  inputName: FormControl = new FormControl();
  filteredOptions: any;
  tableUser: TableCustom;

  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _filterService: FilterService,
    private _router: Router,
    private _tableService: TableService,
    private _userService: UsuarioService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._filterService.resetFilter();
    this._createFilter();
    this._applyFilter();
    this._countPage();
    this._createTable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  addUser(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute })
  }

  changePaginator(paginator: MatPaginator): void {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  edit(user: UsuarioIdentidadeModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, user.id], { relativeTo: this._activatedRoute })
  }

  showFilter(): void {
    this._filterService.changeDisplay();
  }

  private _applyFilter(): void {
    this._subscription.add(
      this._filterService
        .getResults()
        .subscribe(
          (res) => {
            if (res && (Object.keys(res).length > 0)) {
              this._filter = Object.assign({}, this._filterBackup, res);
              this._countPage();
              this._getData();
            } else if (res && (Object.keys(res).length == 0)) {
              this._filter = Object.assign({}, this._filterBackup);
              this._countPage();
              this._getData();
            }
          },
          () => this._tableService.setData([]),
        )
    )
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cpf',
          label: 'CPF',
          mask: DefaultMasks.CPF
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'name',
          label: 'NOME',
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'organizationCNPJ',
          label: 'CNPJ CFC',
          mask: DefaultMasks.CNPJ
        },
      ];
    this._filterService.setFilters(filter)
  }

  private _createTable(): void {
    const tableUser: TableCustom = {
      columns: ['active', 'name', 'username', 'organizationCNPJ', 'email', 'typeUser', 'actions'],
      result: {
        noData: `Não existem usuários cadastrados para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos usuários.`,
      },
      width: '100%',
      data: [],
      columnData: {
        active: {
          type: TableColumnTypeEnum.STRING,
          element: 'active',
          header: 'ATIVO',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        name: {
          type: TableColumnTypeEnum.STRING,
          element: 'name',
          header: 'NOME',
        },
        username: {
          type: TableColumnTypeEnum.STRING,
          element: 'username',
          header: 'USUÁRIO',
        },
        organizationCNPJ: {
          type: TableColumnTypeEnum.STRING,
          element: 'organizationCNPJ',
          header: 'CNPJ CFC',
          pipe: TablePipesTypeEnum.CNPJ
        },
        email: {
          type: TableColumnTypeEnum.STRING,
          element: 'email',
          header: 'EMAIL',
        },
        typeUser: {
          type: TableColumnTypeEnum.STRING,
          element: 'type',
          header: 'TIPO',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'VISUALIZAR',
              onClick: (data) => this.edit(data),
            }
          ],
        },
      },
    };
    this._tableService.setTableCustom(tableUser);
  }

  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._userService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._userService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
