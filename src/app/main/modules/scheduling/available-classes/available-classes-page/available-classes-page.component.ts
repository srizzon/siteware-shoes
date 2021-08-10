import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AulaModel } from '@models/agendamento/aula.model';
import { AulaService } from '@services/apis/agendamento/aula.service';
import { AvailableClassesForm } from '@models/forms/available-classes-form.model';
import { CLASS_MODEL } from '@constants/class-model.constants';
import { CLASS_NUMBER } from '@constants/class-number.constants';
import { CfcModel } from '@models/gestao/cfc.model';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { SchedulingComponentService } from './../../_shared/services/scheduling-component.service';
import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

@Component({
  selector: 'app-available-classes-page',
  templateUrl: './available-classes-page.component.html',
  styleUrls: ['./available-classes-page.component.scss']
})
export class AvailableClassesPageComponent implements OnInit {

  aulas: AulaModel[];
  cfcs: CfcModel[];
  classes = CLASS_NUMBER;
  form: FormGroup;
  services: ServicoGestaoModel[];
  tableData: TableCustom;
  private _subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private classService: AulaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private servicesSubject: ServicesSubject,
  ) { }

  ngOnInit(): void {
    this.cfcs = this.servicesSubject.getCfcsList();
    this.services = this.servicesSubject.getServicosList();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      service: [''],
      course: [''],
      class: [''],
      cfc: [''],
      instructor: [''],
      morning: [''],
      evening: [''],
      night: [''],
    });
  }

  onSubmit() {
    const values: AvailableClassesForm = this.form.getRawValue();
    this._subscription.add(
      this.classService
        .queryAllAvailable({
          turno: this.getTurno(values),
          modelo: values.model
            ? CLASS_MODEL.find((c) => c.id.toString() == values.model).descricao
            : '',
          cfcId: values.cfc,
          instrutorId: values.instructor ? values.instructor.id.toString() : '',
          servicoId: values.service,
          numeroAula: values.class,
          cursoId: values.course ? values.course.id.toString() : '',
        })
        .subscribe((res) => {
          this.aulas = <AulaModel[]>res;
          this.aulas.forEach((element) => {
            element.vagasDisponiveis = element.agendamentoLimiteParticipantes - element.agendamentoQuantidadeParticipantesAgendados;
          });

          this.createTable(this.aulas);
        })
      )
  }

  getTurno(AvailableClasses: AvailableClassesForm) {
    if (AvailableClasses.night) {
      return 'NOITE';
    }
    if (AvailableClasses.morning) {
      return 'MANHA';
    }
    if (AvailableClasses.evening) {
      return 'TARDE';
    }
    return '';
  }

  detailClass(data: AulaModel) {
    this.router.navigate([`${ROUTES_APLICATION.schedule.availableClassesDetail}`, data.id], { relativeTo: this.activatedRoute })
  }

  addCandidateToClass(schedule) {
    this.router.navigate([`${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.addCandidateToClass}/agendamento`, schedule.id]);
  }

  createTable(rows) {
    this.tableData = {
      columns: [
        'turno',
        'modelo',
        'data',
        'horaInicio',
        'horaFim',
        'limiteParticipantes',
        'instrutorNome',
        'cfcNome',
        'addCandidate',
      ],
      title: 'Tabela de Aulas Disponíveis',
      subTitle: '',
      displayPaginator: true,
      width: '99%',
      result: {
        noData: `Não existem turmas cadastradas para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir turmas existentes.`,
      },
      columnData: {
        turno: {
          type: TableColumnTypeEnum.STRING,
          element: 'turno',
          header: 'TURNO',
        },
        modelo: {
          type: TableColumnTypeEnum.STRING,
          element: 'modelo',
          header: 'MODELO',
        },
        data: {
          type: TableColumnTypeEnum.STRING,
          element: 'agenda',
          header: 'DATA',
          pipe: TablePipesTypeEnum.DATE
        },
        horaInicio: {
          type: TableColumnTypeEnum.STRING,
          element: 'agenda',
          header: 'INÍCIO',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        horaFim: {
          type: TableColumnTypeEnum.STRING,
          element: 'agendaFim',
          header: 'FIM',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        limiteParticipantes: {
          type: TableColumnTypeEnum.STRING,
          element: 'limiteParticipantes',
          header: 'VAGAS',
        },
        instrutorNome: {
          type: TableColumnTypeEnum.STRING,
          element: 'instrutorNome',
          header: 'INSTRUTOR',
        },
        cfcNome: {
          type: TableColumnTypeEnum.STRING,
          element: 'cfcNome',
          header: 'CFC',
        },
        addCandidate: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'OPÇÕES',
          buttons: [
            {
              label: 'ALUNOS',
              icon: 'person_add_alt',
              onClick: (data) => this.addCandidateToClass(data),
            },
            {
              label: 'DETALHES',
              icon: 'info',
              onClick: (data) => this.detailClass(data),
            },
          ],
          pipe: null,
          style: null,
        },
      },
      data: rows,
    };
  }
}
