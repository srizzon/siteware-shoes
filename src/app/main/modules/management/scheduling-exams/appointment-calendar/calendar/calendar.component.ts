import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { isSameMonth, isSameDay, startOfMonth, format, addMonths } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { colors } from './../colors';
import { MarcacaoExameDisponibilidadeCache } from '@models/gestao/marcacao-exame-disponibilidade-cache.model';
import { MarcacaoExameDisponibilidadeCacheService } from '@services/apis/gestao/marcacao-exame-disponibilidade-cache.service';
import { PlacesDialogComponent, PlacesDialogInterface } from './../places-dialog/places-dialog.component';
import { HeaderPageInterface } from '@components/header-inside-page/header-inside-page.component';
import { Toast } from '@core/services/outros/toast.service';

interface CustomCalendarEvents<T> extends CalendarEvent {
  super();
  disabled: boolean;
}
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() exame: any;
  @Output() showComponent = new EventEmitter<string>();
  @Output() agendaSelecionada = new EventEmitter<any>();
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<{ exame: MarcacaoExameDisponibilidadeCache }>[]>;
  activeDayIsOpen: boolean = false;
  headerCustom: HeaderPageInterface;
  private _subscription: Subscription;

  constructor(
    private _marcacaoService: MarcacaoExameDisponibilidadeCacheService,
    private _dialog: MatDialog,
    private _toast: Toast
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit( ): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.exame && changes.exame.currentValue) {
      this.headerCustom =  {
        title: 'Seleção de Locais',
        text: 'Selecione um local disponível no calendário abaixo.'
      }
      this.fetchEvents();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  fetchMarcacaoExame(): Observable<CalendarEvent<{ exame: MarcacaoExameDisponibilidadeCache }>[]> {
    const primeiroDia = format(startOfMonth(this.viewDate), 'yyyy-MM-dd');
    const ultimoDia = format(startOfMonth(addMonths(this.viewDate, 1)), 'yyyy-MM-dd');

    const params = {
      idExame: this.exame.id,
      dataHoraInicio: primeiroDia,
      dataHoraFim: ultimoDia,
      disponivel: true
    };

    return this._marcacaoService
      .getAll(params)
      .pipe(
        map((result: any) => {
          return result.map((exame: MarcacaoExameDisponibilidadeCache) => {
            const bloqueio = exame.horarios.filter(x => x.bloqueado);
            let examReturn = {
              start: new Date(exame.data),
              title: '',
              color: colors.gray,
              draggable: false,
              disabled: false,
              meta: { exame }
            }
            if (exame.quantidadeVagasTotalDisponivel == 0) {
              examReturn.title = `${exame.descricaoLocal} - <span class='locais'> Todos os horários deste local já foram agendados.</span>`;
              examReturn.color = colors.red;
              examReturn.disabled = true;
            }
            if (bloqueio.length == exame.horarios.length) {
              examReturn.title = `${exame.descricaoLocal} - <span class='locais'> Todos os horários deste local estão bloqueados.</span>`;
              examReturn.color = colors.gray;
              examReturn.disabled = true;
            } else if (bloqueio.length == 0) {
              examReturn.title = `${exame.descricaoLocal} - <span class='locais'> ${exame.quantidadeVagasTotalDisponivel} Vagas disponíveis.</span>`
              examReturn.color = colors.green;
            } else {
              examReturn.title = `${exame.descricaoLocal} - <span class='locais'> ${exame.quantidadeVagasTotalDisponivel} Vagas disponíveis.</span> - Local com horários bloqueados.`
              examReturn.color = colors.yellow;
            }
            return examReturn;
          })
        })
      )
  }

  fetchEvents(): void {
    this.events$ = this.fetchMarcacaoExame();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent<{ exame: MarcacaoExameDisponibilidadeCache }>[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  compare(a, b) {
    if (a.hora < b.hora) {
      return -1;
    }
    if (a.hora > b.hora) {
      return 1;
    }
    return 0;
  }

  eventClicked(event: CustomCalendarEvents<{ exame: MarcacaoExameDisponibilidadeCache }>): void {
    if (event.disabled) {
      this._toast.info('Agendamento', 'Não é possível selecionar nenhum agendamento para esta data.')
      return
    }
    event.meta.exame.horarios.sort(this.compare);
    const dialogRef = this._dialog.open<PlacesDialogComponent, PlacesDialogInterface>(PlacesDialogComponent, {
      data: { marcacao: event.meta.exame },
      width: '1280px',
    });
    this._subscription.add(
      dialogRef.afterClosed().subscribe(
        (res) => {
          if (res) {
            this.showComponent.emit('marcacao');
            this.agendaSelecionada.emit(Object.assign({}, res));
          }
        }
      )
    )
  }
  back() {
    this.showComponent.emit('marcacao');
  }
}
