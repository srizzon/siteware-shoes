import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

import { GradeServicoModel } from '@models/agendamento/grade-servico.model';
import { GradeServicoService } from '@services/apis/agendamento/grade-servico.service';
import { GradeServicoCursoOrdemService } from '@services/apis/agendamento/grade-servico-curso-oredem.service';
import { GradeServicoDistribuicaoModel } from '@models/agendamento/grade-servico-distribuicao.model';
import { GradesServicoDistribuicaoService } from '@services/apis/agendamento/grades-servicos-distribuicao.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { forkJoin, Subscription } from 'rxjs';

export interface ServiceGridForm {
  id: number;
  description: string;
  enabled: boolean;
  shift: string;
  serviceId: number;
  serviceName: string;
  quantidadeDiasPrevistoConclusao: number;
  service: number;
}

@Component({
  templateUrl: './service-grid-form.component.html',
  styleUrls: ['./service-grid-form.component.scss'],
})
export class ServiceGridFormComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;
  serviceGrid: GradeServicoModel = new GradeServicoModel();
  tableServiceGridDistribution: TableCustom;
  tableServiceGridDistributionData: GradeServicoDistribuicaoModel[] = new Array<GradeServicoDistribuicaoModel>();
  tableOrder: TableCustom;
  tableOrderData: any[] = new Array<any>();

  private _subscription: Subscription;

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _gradeServicoService: GradeServicoService,
    private _gradesServicoDistribuicaoService: GradesServicoDistribuicaoService,
    private _router: Router,
    private _serviceGridCourseOrderService: GradeServicoCursoOrdemService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._createTableServiceGridDistribution();
    this._createOrderTable();
    this._initForm();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._getDataById()
  }

  back() {
    this._router.navigate([`${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.serviceGrid}`])
  }

  editServiceGridDistribution(data) {
  }

  deleteServiceGridDistribution(data) {
  }

  private _createTableServiceGridDistribution() {
    this.tableServiceGridDistribution = {
      columns: [
        'course',
        'classNumber',
        'startTime',
        'endTime',
        'content',
        'actions',
      ],
      title: 'Distribuição das aulas por curso e turno',
      result: {
        noData: `Não existem aulas cadastrados para o curso informado.`,
        defaultMessage: `Realize uma busca para exibir os cursos existentes.`
      },
      width: '100%',
      columnData: {
        course: {
          type: TableColumnTypeEnum.STRING,
          element: 'cursoDescricao',
          header: 'CURSO',
        },
        classNumber: {
          type: TableColumnTypeEnum.STRING,
          element: 'numeroAula',
          header: 'NÚMERO AULA',
        },
        startTime: {
          type: TableColumnTypeEnum.STRING,
          element: 'horaInicio',
          header: 'HORA INICIO',
        },
        endTime: {
          type: TableColumnTypeEnum.STRING,
          element: 'horaTermino',
          header: 'HORA TÉRMINO',
        },
        content: {
          type: TableColumnTypeEnum.STRING,
          element: 'conteudoProgramatico',
          header: 'CONTEÚDO PROGRMÁTICO',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'icons',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'edit',
              onClick: (data) => this.editServiceGridDistribution(data),
            },
            {
              icon: 'delete',
              onClick: (data) => this.deleteServiceGridDistribution(data),
            },
          ],
        },
      }
    };
  }

  editServiceGridOrder(data) {
  }

  deleteServiceGridOrder(data) {
  }

  private _createOrderTable() {
    this.tableOrder = {
      columns: ['course', 'order', 'actions'],
      title: 'Ordem de Cursos',
      result: {
        noData: `Não existem SERVIÇOS cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os SERVIÇOS existentes.`
      },
      width: '100.1%',
      columnData: {
        course: {
          type: TableColumnTypeEnum.STRING,
          element: 'cursoDescricao',
          header: 'CURSO',
        },
        order: {
          type: TableColumnTypeEnum.STRING,
          element: 'ordem',
          header: 'ORDEM',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'icons',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'edit',
              onClick: (data) => this.editServiceGridOrder(data),
            },
            {
              icon: 'delete',
              onClick: (data) => this.deleteServiceGridOrder(data),
            },
          ],
        },
      },
    };
  }

  private _getDataById() {
    if (this._activatedRouter.snapshot.params.id) {
      const id = this._activatedRouter.snapshot.params.id;

      const result = forkJoin({
        gridById: this._gradeServicoService.getServicesGridById(id),
        gridByDistribution: this._gradesServicoDistribuicaoService.getServicesGridByIdDistribution(id),
        gradeService: this._serviceGridCourseOrderService.getByGradeServiceId(id)
      })

      this._subscription.add(
        result.subscribe(
          (data) => {
            this.serviceGrid = data.gridById;
            this.tableServiceGridDistributionData = data.gridByDistribution;
            this.tableOrderData = data.gradeService;
            this._updateForm();
          }
        )
      )
    }
  }

  private _initForm() {
    this.form = this._formBuilder.group({
      id: [''],
      description: ['', Validators.required],
      enabled: ['', Validators.required],
      quantidadeDiasPrevistoConclusao: ['', Validators.required],
      serviceId: ['', Validators.required],
      serviceName: ['', Validators.required],
      shift: ['', Validators.required],
      service: [null, Validators.required]
    });
  }

  private _updateForm(): void {
      this.form.get('id').setValue(this.serviceGrid.id);
      this.form.get('description').setValue(this.serviceGrid.descricao);
      this.form.get('enabled').setValue(this.serviceGrid.ativo)
      this.form.get('quantidadeDiasPrevistoConclusao').setValue(this.serviceGrid.qtdDiasPrevistoConclusao);
      this.form.get('serviceId').setValue(this.serviceGrid.codServicoExterno);
      this.form.get('serviceName').setValue(this.serviceGrid.servicoName);
      this.form.get('shift').setValue(this.serviceGrid.turno);
      this.form.get('service').setValue(this.serviceGrid.codServicoExterno);
  }

  onSubmit() {
    const values: ServiceGridForm = this.form.getRawValue();
    let payload: GradeServicoModel = new GradeServicoModel();
    payload.id = values.id;
    payload.descricao = values.description;
    payload.ativo = values.enabled;
    payload.qtdDiasPrevistoConclusao = values.quantidadeDiasPrevistoConclusao;
    payload.servicoId = values.serviceId;
    payload.turno = values.shift;
  }
}
