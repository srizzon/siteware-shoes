import { Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
@Component({
  selector: 'app-date-picker-custom',
  templateUrl: './date-picker-custom.component.html',
  styleUrls: ['./date-picker-custom.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class DatePickerCustomComponent implements OnInit, OnChanges {

  @Input() dateList: [] = [];
  @ViewChild('calendar') _calendar: any;

  daysSelected: any[] = [];
  event: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dateList && (changes.dateList.currentValue.length > 0)) {
      this.select(changes.dateList.currentValue)
    }
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '/' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? 'selected' : null;
  }

  select(dates) {
    this.daysSelected = dates;
    this._calendar.updateTodaysDate();
  }
}
