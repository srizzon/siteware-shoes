import { Component, OnInit, forwardRef, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, take } from 'rxjs/operators';

import { CfcModel } from '@models/gestao/cfc.model';
import { Helper } from '@utils/helper';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { Toast } from '@services/outros/toast.service';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CfcAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-cfc-autocomplete',
  templateUrl: './cfc-autocomplete.component.html',
  styleUrls: ['./cfc-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class CfcAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  cfcs: CfcModel[];
  filteredCfcs: Observable<CfcModel[]>;
  private innerValue: any = '';

  constructor(
    private _toast: Toast,
    private _servicesSubject: ServicesSubject
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._servicesSubject
      .getCfcs()
      .pipe(
        take(1),
        tap(
          () => this.filteredCfcs = this.fControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              let itens = this.cfcs.slice();
              if (value && value.nomeFantasia) {
                itens = this._filter(value)
              } else if (typeof value == 'number' || value.length == 14) {
                itens = this._filterById(value);
                this.fControl.setValue(itens[0]);
              } else {
                itens = this._filter(value)
              }
              return itens
            })
          )
        )
      )
      .subscribe(
        (res) => {
          const cfcs = Helper.changeToUpercase(res, 'nomeFantasia');
          this.cfcs = Helper.sortItems(cfcs, 'nomeFantasia');
        }
      )
  }



  getCfcName(cfc) {
    return cfc ? cfc.nomeFantasia : '';
  }

  clearCfc(event) {
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

  private _filter(value: any): CfcModel[] {
    const filterValue = value.nomeFantasia ? value.nomeFantasia.toLowerCase() : value.toLowerCase();
    return this.cfcs.filter(cfc => cfc.nomeFantasia.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): CfcModel[] {
    let cfc: CfcModel[];
    if (value.length >= 10) {
      cfc = this.cfcs.filter((cfc: CfcModel) => cfc.cnpj == value);
    } else {
      cfc = this.cfcs.filter((cfc: CfcModel) => cfc.id == value);
    }
    return cfc;
  }
}
