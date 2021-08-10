import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';

import { TopicoService } from '@services/apis/monitoramento/topico.service';
import { TopicoModel } from '@models/monitoramento/topico.model';
import { Toast } from '@services/outros/toast.service';
import { Helper } from '@utils/helper';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TopicoAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-topico-autocomplete',
  templateUrl: './topico-autocomplete.component.html',
  styleUrls: ['./topico-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class TopicoAutocompleteComponent implements OnInit,  ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  topicos: TopicoModel[];
  filtered: Observable<TopicoModel[]>;
  private innerValue: any = '';

  constructor(
    private _toast: Toast,
    private _topicoService: TopicoService
  ) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._topicoService.getAll()
      .pipe(
        take(1),
        tap(
          () => this.filtered = this.fControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              return value ? this._filter(value) : this.topicos.slice()
            })
          )
        )
      )
      .subscribe(
        (res) => {
          const topicos  = Helper.changeToUpercase(res, 'descricao');
          this.topicos = Helper.sortItems(topicos, 'descricao');
          if (this.fControl.value) {
            const value = this._filterById(this.fControl.value);
            this.fControl.setValue(value[0]);
          }
        }
      )
  }

  getName(exame) {
    return exame ? exame.descricao : '';
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

  private _filter(value: any): TopicoModel[] {
    const filterValue = value.descricao ? value.descricao.toLowerCase() : value.toLowerCase();
    return this.topicos.filter(topico => topico.descricao.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): TopicoModel[] {
    return this.topicos.filter((item) => item.id == value);
  }
}
