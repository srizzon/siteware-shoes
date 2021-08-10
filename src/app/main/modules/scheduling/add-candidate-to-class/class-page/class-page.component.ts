import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Candidato } from '@models/gestao/candidato.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from 'src/app/main/components/dialogs/confirm-dialog/confirm-dialog.component';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { GradeCandidatoModel } from '@models/agendamento/grade-candidato.model';
import { GradeCandidatoService } from '@services/apis/agendamento/grade-candidato.service';
import { MatriculaAgendamentoModel } from '@models/agendamento/matricula-agendamento.model';
import { CandidatoAgendamentoService } from '@services/apis/agendamento/candidato-agendamento.service';
import { MatriculaAgendamentoService } from '@services/apis/agendamento/matricula-agendamento.service';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableService } from '@components/tables/table-service';
import { Toast } from '@services/outros/toast.service';
import { Subscription, of, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.scss'],
})
export class ClassPageComponent implements OnInit, OnDestroy {

  results$: Observable<any>
  subject: Subject<any> = new Subject();

  candidates: Candidato[];
  form: FormGroup;
  tableClass: TableCustom;
  type: string;
  class = {
    vagas: 0,
    descricao: '',
    instrutor: '',
    inicio: null,
    turno: ''
  }
  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _candidateSchedulleService: CandidatoAgendamentoService,
    private _dialog: MatDialog,
    private _enrollmentService: MatriculaAgendamentoService,
    private _filterService: FilterService,
    private _gridCandidateService: GradeCandidatoService,
    private _toast: Toast,
    private _tableService: TableService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._filterService.resetFilter();
    this._applyFilter();
    this._countPage();
    this._createTableEnrrolment();
    this._getDataById();
    this._getData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  applyFilter(event): void {
    const searchText = event.target.value;
    this.subject.next(searchText)
  }

  addCandidate(matricula: MatriculaAgendamentoModel) {
    const id = this._activatedRoute.snapshot.params.id;
    if (this.tableClass.data.find(x => x.candidatoCpf == matricula.candidatoCpf)) {
      this._toast.info('Candidato', 'Candidato já se encontra vinculado.');
      return;
    }
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Vinculo de Candidato',
        subtitle: `Tem certeza que deseja adicionar o candidato ${matricula.candidatoNome}?`,
      },
      width: '520px',
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {

          if (this.type == 'grid') {
            let gridCandidate = new GradeCandidatoModel();
            gridCandidate.matriculaId = matricula.id;
            gridCandidate.gradeId = id;
            this._gridCandidateService.create(gridCandidate)
              .subscribe((res) => {
                this._toast.success('Vinculo de Candidato');
                this.tableClass.data.push(matricula);
                this.tableClass = Object.assign([], this.tableClass);
                this.class.vagas--;
              });
          } else if (this.type == 'agendamento') {
            let payload = {
              candidatoCpf: matricula.candidatoCpf,
              matriculaId: matricula.id
            }
            this._candidateSchedulleService.addCandidateToClass(id, payload).subscribe(
              (res) => {
                let response: MatriculaAgendamentoModel = {
                  candidatoCpf: res.matricula.candidato.cpf,
                  candidatoNome: res.matricula.candidato.nome,
                  cfcCnpj: res.cfc.cnpj,
                  cfcNome: res.cfc.nome,
                  id: res.id,
                }
                this.tableClass.data.push(response);
                this.tableClass = Object.assign([], this.tableClass);
                this.class.vagas--;
                this._toast.success('Vinculo de Candidato');
              }
            )
          }
        }
      })
    )
  }

  changePaginator(paginator: MatPaginator) {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  removeCandidate(candidato: any) {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Desvinculo de Candidato',
        subtitle: `Tem certeza que deseja remover o candidato ${candidato.candidatoNome}?`
      },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result && this.type == 'grid') {
          this._gridCandidateService.delete(candidato.id).subscribe(
            () => {
              this._toast.success('Desvinculo de Candidato');
              const index = this.tableClass.data.findIndex((x) => x.id === candidato.id);
              this.tableClass.data.splice(index, 1);
              this.tableClass = Object.assign({}, this.tableClass);
              this.class.vagas++;
            }
          );
        } else if (result && this.type == 'agendamento') {
          this._candidateSchedulleService.removeCandidateFromClass(candidato.id).subscribe(
            () => {
              this._toast.success('Desvinculo de Candidato');
              const index = this.tableClass.data.findIndex((x) => x.id === candidato.id);
              this.tableClass.data.splice(index, 1);
              this.tableClass = Object.assign({}, this.tableClass);
              this.class.vagas++;
            }
          )
        }
      })
  }

  private _createTableCandidates(rows) {
    this.tableClass = {
      columns: ['candidate', 'actions'],
      width: '100.1%',
      result: {
        noData: `Não existem candidatos cadastrados para a turma informada.`,
        defaultMessage: `Realize uma busca para exibir os candidatos existentes.`,
      },
      columnData: {
        candidate: {
          type: TableColumnTypeEnum.STRING,
          element: 'candidatoNome',
          header: 'ALUNO',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'icons',
          header: 'REMOVER',
          buttons: [
            {
              icon: 'backspace',
              onClick: (data) => this.removeCandidate(data),
            },
          ],
        },
      },
      data: rows,
    };
  }

  private _applyFilter(): void {
    this._subscription.add(
      this.subject
        .pipe(debounceTime(1000))
        .subscribe((res) => {
          this._filter = Object.assign({}, this._filterBackup)
          if (res) {
            if (isFinite(res)) {
              this._filter['cpf'] = res;
            } else {
              this._filter['nome'] = res;
            }
          }
          this._countPage();
          this._getData();
        })
    )
  }

  private _createTableEnrrolment() {
    const tableEnrrolment: TableCustom = {
      columns: ['nome', 'cpf', 'actions'],
      class: 'table-enrrolment-class-page',
      width: '100.1%',
      result: {
        noData: `Não existem matrículas cadastradas para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir as matriculas dos candidatos.`,
      },
      columnData: {
        nome: {
          type: TableColumnTypeEnum.OBJECT,
          element: 'candidatoNome',
          header: 'ALUNO',
        },
        cpf: {
          type: TableColumnTypeEnum.OBJECT,
          element: 'candidatoCpf',
          header: 'CPF',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'icons',
          header: 'ADICIONAR',
          buttons: [
            {
              icon: 'arrow_right_alt',
              onClick: (data) => this.addCandidate(data),
            },
          ],
        },
      },
      data: [],
    };
    this._tableService.setTableCustom(tableEnrrolment);
  }


  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._enrollmentService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._enrollmentService.buscarMatriculas(filter);
    this._tableService.setEndPointData(endpoint);
  }

  private _getDataById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      if (this._activatedRoute.snapshot.url[0].path == 'agendamento') {
        this.type = 'agendamento';
        this._createTableCandidates(this._activatedRoute.snapshot.data['agendamentoCandidatos']);
        const agendamento = this._activatedRoute.snapshot.data['agendamento'][0]
        this.class.vagas = agendamento.limiteParticipantes;
        this.class.descricao = agendamento.gradeDescricao;
        this.class.instrutor = agendamento.instrutorNome;
        this.class.inicio = agendamento.agenda;
        this.class.turno = agendamento.turno;
      } else if (this._activatedRoute.snapshot.url[0].path == 'grid') {
        this.type = 'grid';
        const grid = this._activatedRoute.snapshot.data['gradePorId'];
        this.class.vagas = grid.qtdVagasDisponiveis;
        this.class.descricao = grid.gradeServicoDescricao;
        this.class.instrutor = grid.instrutorNome;
        this.class.inicio = grid.dataInicio;
        this.class.turno = grid.turno;
        this._createTableCandidates(this._activatedRoute.snapshot.data['gradeCandidatos']);
      }
    }
  }
}
