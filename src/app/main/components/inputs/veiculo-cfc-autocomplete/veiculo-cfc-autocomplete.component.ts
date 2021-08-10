import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, ViewEncapsulation } from '@angular/core';

import { ServicesSubject } from '@services/outros/services-subjects.service';
import { Toast } from '@services/outros/toast.service';
import { VeiculoModel } from '@models/gestao/veiculo.model';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VeiculoCfcAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-veiculo-cfc-autocomplete',
  templateUrl: './veiculo-cfc-autocomplete.component.html',
  styleUrls: ['./veiculo-cfc-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class VeiculoCfcAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();

  veiculos: VeiculoModel[];
  filtered: Observable<VeiculoModel[]>;
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
      .getVeiculo()
      .pipe(
        take(1),
        tap(
          () => {
            this.filtered = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.veiculos.slice();
                if (value && value.placa) {
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
        (res) => this.veiculos = res
      )
  }

  getName(veiculo) {
    return veiculo ? veiculo.placa : '';
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

  private _filter(value: any): VeiculoModel[] {
    const filterValue = value.placa ? value.placa.toLowerCase() : value;
    return this.veiculos.filter(veiculo => veiculo.placa.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): VeiculoModel[] {
    return this.veiculos.filter((veiculo: VeiculoModel) => veiculo.id == value);
  }
}
