import { Component, OnInit, forwardRef, Input, ViewEncapsulation, OnChanges, SimpleChanges, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, take } from 'rxjs/operators';

import { Helper } from '@utils/helper';
import { Toast } from '@services/outros/toast.service';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';


export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ServiceSchedullingAutocompleteComponent),
  multi: true,
};
@Component({
  selector: 'app-service-schedulling-autocomplete',
  templateUrl: './service-schedulling-autocomplete.component.html',
  styleUrls: ['./service-schedulling-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class ServiceSchedullingAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: boolean = true;
  items: ServicoAgendamentoModel[];
  filteredItems: Observable<ServicoAgendamentoModel[]>;
  private innerValue: any = '';

  constructor(
    private _service: ServicesSubject,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._service
      .getServicoAgendamento()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredItems = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.items.slice();
                if (value && value.descricao) {
                  itens = this._filter(value)
                } else if (typeof value == 'number') {
                  itens = this._filterById(value);
                  this.fControl.setValue(itens[0]);
                } else {
                  itens = this._filter(value);
                  if ((itens.length == 1) && value) {
                    this.fControl.setValue(itens[0]);
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
          const items = Helper.changeToUpercase(res, 'descricao');
          this.items = Helper.sortItems(items, 'descricao');
        }
      )
  }

  getName(item): void {
    return item ? item.descricao : '';
  }

  clear(event): void {
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

  private _filter(value: any): ServicoAgendamentoModel[] {
    const filterValue = value.descricao ? value.descricao.toLowerCase() : value;
    return this.items.filter((item) => item.descricao.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): ServicoAgendamentoModel[] {
    return this.items.filter((item: ServicoAgendamentoModel) => item.id == value);
  }
}
