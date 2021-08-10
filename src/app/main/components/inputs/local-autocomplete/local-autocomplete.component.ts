import { ConstantModel } from '@models/outros/constant.model';
import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef, ViewEncapsulation, Input } from '@angular/core';
import { Toast } from '@services/outros/toast.service';

import { CursoAgendamentoModel } from '@models/agendamento/curso-agendamento.model';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { Helper } from '@utils/helper';


export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LocalAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-local-autocomplete',
  templateUrl: './local-autocomplete.component.html',
  styleUrls: ['./local-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class LocalAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: boolean = true;
  items: ConstantModel[];
  filteredItems: Observable<ConstantModel[]>;
  private innerValue: any = '';

  constructor(
    private _service: ServicesSubject,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this.loadItens();
  }

  loadItens() {
    this._service
      .getLocal()
      .pipe(
        take(1),
        tap(
          () => (this.filteredItems = this.fControl.valueChanges
            .pipe(
              startWith(''),
              map((value) => value ? this._filter(value) : this.items.slice())
            ))
        )
      )
      .subscribe(
        (res) => {
          const items = Helper.changeToUpercase(res, 'descricao');
          this.items = Helper.sortItems(items, 'descricao');
          if (this.fControl.value) {
            const value = this._filterById(this.fControl.value);
            this.fControl.setValue(value[0]);
          }
        }
      );
  }

  getName(item) {
    return item ? item.descricao : '';
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

  propagateChange = (_: any) => { };

  private _filter(value: any): ConstantModel[] {
    const filterValue = value.descricao ? value.descricao.toLowerCase() : value;
    let filter = this.items.filter((item) => item.descricao.toLowerCase().indexOf(filterValue) === 0);
    return filter;
  }

  private _filterById(value: CursoAgendamentoModel): CursoAgendamentoModel[] {
    return this.items.filter((item) => item.id == value);
  }
}
