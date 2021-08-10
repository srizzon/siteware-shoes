import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { GradeServicoService } from '@services/apis/agendamento/grade-servico.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { GradeServicoModel } from '@models/agendamento/grade-servico.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-service-grid-page',
  templateUrl: './service-grid-page.component.html',
  styleUrls: ['./service-grid-page.component.scss']
})
export class ServiceGridPageComponent implements OnInit, OnDestroy {

  controller = false;
  tableData: TableCustom;
  servicesGrid: GradeServicoModel[];
  private _subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private gradeServicoService: GradeServicoService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  loadData() {
    this._subscription.add(
      this.gradeServicoService.getAllServicesGrid().subscribe((res) => {
        this.createTable(res);
      })
    )
  }

  addGrid() {
    this.router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this.activatedRoute });
  }

  editServiceGrid(grid) {
    this.router.navigate([`${ROUTES_APLICATION.detail}`, grid.id], { relativeTo: this.activatedRoute });
  }

  deleteServiceGrid(grid: GradeServicoModel) {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Deletar Grade de Serviço',
        subtitle: `Tem certeza que deseja remover a grade de serviço: ${grid.descricao}?`,
      },
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.gradeServicoService.deleteServiceGrid(grid.id).subscribe(
            (res) => {
              this.toastrService.clear();
              this.toastrService.success(
                'Grade deletada com sucesso.',
                'Grade de Serviço'
              );
              const index = this.tableData.data.findIndex(
                (x) => x.id === grid.id
              );
              this.tableData.data.splice(index, 1);
              this.tableData = Object.assign({}, this.tableData);
            },
            () => {
              this.toastrService.clear();
              this.toastrService.error(
                'Não foi possível deletar a grade.',
                'Grade de Serviço'
              );
            }
          );
        }
      })
    )
  }

  createTable(data) {
    this.tableData = {
      columns: [
        'servico',
        'turno',
        'descricao',
        'diasConclusao',
        'horaInicio',
        'horaTermino',
        'ativo',
        'actions',
      ],
      title: 'Tabela de Grades de Serviços',
      subTitle: null,
      width: '80%',
      result: {
        noData: 'Não existe grade serviço para a pesquisa informada.',
        defaultMessage:
          'Realize uma busca para exibir os candidados existentes.',
      },
      data: data,
      columnData: {
        descricao: {
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
          header: 'DESCRIÇÃO',
        },
        diasConclusao: {
          type: TableColumnTypeEnum.STRING,
          element: 'qtdDiasPrevistoConclusao',
          header: 'QTD. DIAS (PLANEJADO)',
        },
        turno: {
          type: TableColumnTypeEnum.STRING,
          element: 'turno',
          header: 'TURNO',
        },
        servico: {
          type: TableColumnTypeEnum.STRING,
          element: 'servicoDescricao',
          header: 'SERVIÇO',
        },
        horaInicio: {
          type: TableColumnTypeEnum.STRING,
          element: 'horaInicio',
          header: 'HORA INICIO',
        },
        horaTermino: {
          type: TableColumnTypeEnum.STRING,
          element: 'horaTermino',
          header: 'HORA TÉRMINO',
        },
        ativo: {
          type: TableColumnTypeEnum.STRING,
          element: 'ativo',
          header: 'ATIVO',
          pipe: TablePipesTypeEnum.TRUE_FALSE,
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'icons',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'edit',
              onClick: (data) => this.editServiceGrid(data),
            },
            {
              icon: 'delete',
              onClick: (data) => this.deleteServiceGrid(data),
            },
          ],
        },
      },
    };
  }

}
