import { CnhCategories } from '@constants/cnh-categories.constants';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, ViewEncapsulation } from '@angular/core';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CnhCategoriesComponent),
  multi: true
};
@Component({
  selector: 'app-cnh-categories',
  templateUrl: './cnh-categories.component.html',
  styleUrls: ['./cnh-categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class CnhCategoriesComponent implements OnInit,  ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();

  categories: Array<string>;
  filtered: Observable<Array<string>>;
  cnhCategories = CnhCategories;
  private innerValue: any = '';

  constructor() { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    if (this.fControl.value) {
      const categorie = this._filterById(this.fControl.value)
      if(categorie){
        this.fControl.setValue(categorie.id)
      }
    }
  }

  clear(event) {
    if (this.fControl.disabled) return
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


  private _filterById(value: any) {
    return this.cnhCategories.find(categorie => categorie.id == value);
  }
}
