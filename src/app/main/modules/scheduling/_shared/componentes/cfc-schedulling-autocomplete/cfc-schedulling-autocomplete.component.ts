import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';

import { CfcAgendamentoModel } from '@core/models/agendamento/cfc-agendamento.model';
import { Helper } from '@utils/helper';
import { ServicesSubject } from '@services/outros/services-subjects.service';


export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CfcSchedullingAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-cfc-schedulling-autocomplete',
  templateUrl: './cfc-schedulling-autocomplete.component.html',
  styleUrls: ['./cfc-schedulling-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class CfcSchedullingAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: boolean = true;
  items: CfcAgendamentoModel[];
  filteredItems: Observable<CfcAgendamentoModel[]>;
  private innerValue: any = '';

  constructor(
    private _service: ServicesSubject,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service
      .getCfcsAgendamento()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredItems = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.items.slice();
                if (value && value.nome) {
                  itens = this._filter(value)
                } else if (typeof value == 'number'){
                  itens = this._filterById(value);
                  this.fControl.setValue(itens[0]);
                  this._cdr.detectChanges();
                } else {
                  itens = this._filter(value)
                  if (itens.length == 1) {
                    this.fControl.setValue(itens[0]);
                    this._cdr.detectChanges();
                  }
                }
                return itens
              })
            )
          }
        )
      )
      .subscribe(
        (res) => {
          const items = Helper.changeToUpercase(res, 'nome');
          this.items = Helper.sortItems(items, 'nome');
        }
      )
  }

  getName(item) {
    return item ? item.nome : '';
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

  propagateChange = (_: any) => { };

  private _filter(value: any): CfcAgendamentoModel[] {
    const filterValue = value.nome ? value.nome.toLowerCase() : value.toLowerCase();
    return this.items.filter(x => x.nome.toLocaleLowerCase().match(filterValue))
 }

  private _filterById(value: any): CfcAgendamentoModel[] {
    return this.items.filter((item: CfcAgendamentoModel) => item.id == value);
  }
}
