import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';
@Component({
  selector: 'app-practical-calendar-header',
  templateUrl: './practical-calendar-header.component.html',
  styleUrls:  ['./practical-calendar-header.component.scss']
})
export class PracticalCalendarHeaderComponent {
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() exame: {id: '', descricao: ''};

  @Input() locale: string = 'pt-br';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
