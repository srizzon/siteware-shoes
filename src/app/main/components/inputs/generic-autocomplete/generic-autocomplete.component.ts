import { Component, OnInit, forwardRef, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { startWith, map, tap, take } from 'rxjs/operators';

export interface ItemToFind {
  key: any,
  displayItem: any
}
export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GenericAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class GenericAutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: string;
  @Input() data: Observable<any[]>;
  @Input() key: string;
  @Input() valueItem: string;

  keyControl: FormControl = new FormControl();
  dataList: any[] = [];
  filtered: Observable<any[]>;
  formItemToFind: FormControl = new FormControl();
  filterItem: any[] = [];

  private innerValue: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue && changes.data.currentValue.length > 0 && this.dataList.length == 0) {
      this.loadData(changes.data.currentValue);
    }
    if (changes.fControl && changes.fControl.currentValue.value) {
      const find = this._filter(changes.fControl.currentValue.value)
      this.fControl.setValue(find)
    }
    if (changes.key && changes.key.currentValue) {
      this.keyControl.setValue(changes.key.currentValue)
    }
  }

  loadData(data?) {
    this.dataList = data;
    this.filtered = this.fControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value) : this.dataList.slice()
      })
    )
  }

  getName(item) {
    let name = '';
    if (this.filterItem.length > 0 && this.filterItem.length < 2) {
      name = this.filterItem[0][item]
    }
    return name;
  }

  clear(event) {
    this.fControl.setValue('');
    event.preventDefault();
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

  private _filter(value: any): any[] {
    let item = null;

    if (typeof value == 'object') {
      item = this.dataList.filter(item => item[this.key] === value[this.key]);
    } else if (typeof value == 'string') {
      item = this.dataList.filter(item => item[this.valueItem].toLowerCase().indexOf(value.toLowerCase()) === 0);
    }
    this.filterItem = item;
    return item
  }

}
