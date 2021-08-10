import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { InstrutorModel } from '@models/gestao/instrutor.model';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';

@Component({
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.scss']
})
export class InstructorPageComponent implements OnInit {

  instructorTable: TableCustom;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.initTable(this._activatedRoute.snapshot.data['instructors']);
  }

  add() {
    this._router.navigate([ROUTES_APLICATION.add], { relativeTo: this._activatedRoute });
  }

  edit(instructor: InstrutorModel) {
    this._router.navigate([ROUTES_APLICATION.detail, instructor.cpf], { relativeTo: this._activatedRoute });
  }

  initTable(data) {
    this.instructorTable = {
      columns: ['nome', 'cpf', 'email', 'telefone', 'ativo', 'actions'],
      result: {
        noData: `Não existem planos de aulas para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos planos de aulas.`,
      },
      width: '100%',
      data: data,
      columnData: {
        nome: {
          type: TableColumnTypeEnum.STRING,
          element: 'nome',
          header: 'NOME',
        },
        cpf: {
          type: TableColumnTypeEnum.STRING,
          element: 'cpf',
          header: 'CPF',
          pipe: TablePipesTypeEnum.CPF
        },
        email: {
          type: TableColumnTypeEnum.STRING,
          element: 'email',
          header: 'EMAIL',
        },
        telefone: {
          type: TableColumnTypeEnum.STRING,
          element: 'telefone',
          header: 'TELEFONE'
        },
        ativo: {
          type: TableColumnTypeEnum.STRING,
          element: 'ativo',
          header: 'ATIVO',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'DETALHES',
              onClick: (data) => this.edit(data),
            }
          ],
        },
      },
    };
  }
}

