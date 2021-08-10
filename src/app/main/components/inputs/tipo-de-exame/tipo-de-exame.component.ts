import { ServicesSubject } from './../../../../core/services/outros/services-subjects.service';
import { ConstantModel } from '@models/outros/constant.model';
import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';

import { ExameService } from '@services/apis/gestao/exame.service';
import { Toast } from '@services/outros/toast.service';
import { Helper } from '@utils/helper';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TipoDeExameComponent),
  multi: true
};
@Component({
  selector: 'app-tipo-de-exame',
  templateUrl: './tipo-de-exame.component.html',
  styleUrls: ['./tipo-de-exame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class TipoDeExameComponent implements OnInit,  ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  exames: ConstantModel[];
  filteredExames: Observable<ConstantModel[]>;
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
      .getTipoExame()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredExames = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.exames.slice();
                if (value && value.descricao) {
                  itens = this._filter(value)
                } else if (typeof value == 'number'){
                  itens = this._filterById(value);
                  this.fControl.setValue(itens[0]);
                } else if (value){
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
          const exames = Helper.changeToUpercase(res, 'descricao');
          this.exames = Helper.sortItems(exames, 'descricao');
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

  private _filter(value: any): ConstantModel[] {
    const filterValue = value.descricao ? value.descricao.toLowerCase() : value;
    return this.exames.filter(exame => exame.descricao.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): ConstantModel[] {
    return this.exames.filter((exame: ConstantModel) => exame.id == value);
  }
}
