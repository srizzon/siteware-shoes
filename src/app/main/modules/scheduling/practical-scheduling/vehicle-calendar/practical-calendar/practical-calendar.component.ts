import { VehicleAvailabilityCachesGroupedModel } from '@models/agendamento-pratico/vehicle-availability-caches-grouped.model';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { isSameMonth, isSameDay, startOfMonth, format, addMonths } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { colors } from './../colors';
import { UserControllerService } from '@services/outros/user-controller.service';
import { VehicleDialogComponent, VehicleDialogInterface } from './../vehicle-dialog/vehicle-dialog.component';
import { VehicleAvailabilityCachesService } from '@services/apis/agendamento-pratico/vehicle-availability-caches.service';
import { VehicleAvailabilityCachesModel } from '@models/agendamento-pratico/vehicle-availability-caches.model';
import { HeaderPageInterface } from '@components/header-inside-page/header-inside-page.component';

@Component({
  selector: 'app-practical-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './practical-calendar.component.html',
  styleUrls: ['./practical-calendar.component.scss']
})
export class PracticalCalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() exame: any;
  @Output() showComponent = new EventEmitter<string>();
  @Output() agendaSelecionada = new EventEmitter<any>();
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<{ exame: VehicleAvailabilityCachesGroupedModel }>[]>;
  activeDayIsOpen: boolean = false;
  headerCustom: HeaderPageInterface;

  private _subscription: Subscription;

  constructor(
    private _vehicleService: VehicleAvailabilityCachesService,
    private _dialog: MatDialog,
    private _userService: UserControllerService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.exame && changes.exame.currentValue) {
      this.headerCustom =  {
        title: 'Seleção de Veículos',
        text: 'Selecione um veículo disponível no calendário abaixo.'
      }
      this.fetchEvents();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  fetchMarcacaoExame(): Observable<CalendarEvent<{ exame: VehicleAvailabilityCachesModel }>[]> {
    const params = {
      startDate: format(startOfMonth(this.viewDate), 'yyyy-MM-dd'),
      endDate: format(startOfMonth(addMonths(this.viewDate, 1)), 'yyyy-MM-dd'),
      registratonNumberOrganization: this._userService.getUserLogged().organizationCNPJ
    };

    return this._vehicleService
      .getAllGrouped(params)
      .pipe(
        map((result: any) => {
          return result.map((exame: VehicleAvailabilityCachesGroupedModel) => {
            exame.vehicleAvailabilityCaches.map(x => x.licencePlate = exame.licencePlate);
            let examReturn = {
              start: new Date(exame.date),
              title: `<span class='locais'>${exame.totalAmountAvailableRoom} Vagas disponíveis.</span>`,
              color: colors.red,
              draggable: false,
              disabled: true,
              meta: { exame }
            }
            return examReturn;
          })
        })
      )
  }

  fetchEvents(): void {
    this.events$ = this.fetchMarcacaoExame();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent<{ exame: VehicleAvailabilityCachesModel }>[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ exame: VehicleAvailabilityCachesModel }>): void {
    const dialogRef = this._dialog.open<VehicleDialogComponent, any>(VehicleDialogComponent, {
      data: event.meta.exame,
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
