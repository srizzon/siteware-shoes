import { Component, OnInit, forwardRef, Input, ViewEncapsulation, OnChanges, SimpleChanges, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, take } from 'rxjs/operators';

import { Helper } from '@utils/helper';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { ServicoGestaoModel } from '@models/gestao/servico-gestao.model';
import { Toast } from '@services/outros/toast.service';


export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ServiceAutocompleteComponent),
  multi: true,
};
@Component({
  selector: 'app-service-autocomplete',
  templateUrl: './service-autocomplete.component.html',
  styleUrls: ['./service-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class ServiceAutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() fControl: FormControl = new FormControl();
  services: ServicoGestaoModel[];
  filtered: Observable<ServicoGestaoModel[]>;
  private innerValue: any = '';

  constructor(
    private _servicesSubject: ServicesSubject,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fControl.currentValue.value) {
      if (!this.services) {
        this.loadData();
      }
      const find = this._filterById(changes.fControl.currentValue.value)
      this.fControl.setValue(find)
    }
  }

  loadData() {
    this._servicesSubject
      .getServicos()
      .pipe(
        take(1),
        tap(
          () => this.filtered = this.fControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              return value ? this._filter(value) : this.services.slice()
            })
          )
        )
      )
      .subscribe(
        (res) => {
          const service = Helper.changeToUpercase(res, 'nome');
          this.services = Helper.sortItems(service, 'nome');
        }
      )
  }
  getName(item) {
    return item ? item.nome : '';
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

  private _filter(value: any): ServicoGestaoModel[] {
    const filterValue = value.nome ? value.nome.toLowerCase() : value;
    return this.services.filter((service) => service.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): ServicoGestaoModel {
    return this.services.find((service) => service.codigoExterno == value);
  }
}
