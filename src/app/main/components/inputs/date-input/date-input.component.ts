import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

import { Toast } from '@services/outros/toast.service';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateInputComponent),
  multi: true
};
@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class DateInputComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() clear: boolean = false;
  dateformat = '';

  private innerValue: any = '';

  constructor(
    private toast: Toast
  ) { }

  ngOnInit(): void {
  }

  formatDate(date, event) {
    var regex = /[0-9]|\./;
    if (!regex.test(event)) {
      var v = date.value;
      if (v.match(/^\d{2}$/) !== null) {
        this.dateformat = v + '/';
      } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        this.dateformat = v + '/';
      }
      if (v.length == 10) {
        let newDate = date.value.split('/');
        newDate = new Date(`${newDate[2]}/${newDate[1]}/${newDate[0]}`);
        newDate = moment.utc(newDate).format();
        if (moment(newDate).isValid) {
          this.fControl.setValue(newDate);
        } else {
          this.toast.error('Data', 'Data Inválida');
          this.dateformat = '';
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
/*     if (changes && changes.fControl.currentValue.value) {
      this.dateformat = moment(changes.fControl.currentValue.value).format('DD/MM/YYYY');
    } */
    if (changes && changes.clear) {
      this.dateformat = null;
    }
  }

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  propagateChange = (_: any) => { }
}

