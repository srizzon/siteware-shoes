import { Component, OnInit, forwardRef, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { startWith, map, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Helper } from '@utils/helper';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { Toast } from '@services/outros/toast.service';
import { UnidadeDetran } from '@models/gestao/unidade-detran.model';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UnidadeDetranAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-unidade-detran-autocomplete',
  templateUrl: './unidade-detran-autocomplete.component.html',
  styleUrls: ['./unidade-detran-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class UnidadeDetranAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  unidadesDetran: UnidadeDetran[];
  filteredUnidades: Observable<UnidadeDetran[]>;
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
      .getUnidadeDetran()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredUnidades = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.unidadesDetran.slice();
                if (value && value.nomeFantasia) {
                  itens = this._filter(value)
                } else if (typeof value == 'number'){
                  itens = this._filterById(value);
                  this.fControl.setValue(itens[0]);
                } else {
                  itens = this._filter(value)
                }
                return itens
              })
            )
          }
        )
      )
      .subscribe(
        (res) => {
          const unidadesDetran = Helper.changeToUpercase(res, 'nomeFantasia');
          this.unidadesDetran = Helper.sortItems(unidadesDetran, 'nomeFantasia');
        }
      )
  }

  getName(unidadesDetran) {
    return unidadesDetran ? unidadesDetran.nomeFantasia : '';
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

  private _filter(value: any): UnidadeDetran[] {
    const filterValue = value.nomeFantasia ? value.nomeFantasia.toLowerCase() : value;
    return this.unidadesDetran.filter(unidadesDetran => unidadesDetran.nomeFantasia.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): UnidadeDetran[] {
    return this.unidadesDetran.filter((unidade: UnidadeDetran) => unidade.id == value);
  }
}
