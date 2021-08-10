import { Component, OnInit, forwardRef, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, take } from 'rxjs/operators';

import { Helper } from '@utils/helper';
import { InstrutorAgendamentoModel } from '@models/agendamento/instrutor-agendamento.model';
import { ServicesSubject } from '@services/outros/services-subjects.service';


export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InstructorSchedullingAutocompleteComponent),
  multi: true,
};
@Component({
  selector: 'app-instructor-schedulling-autocomplete',
  templateUrl: './instructor-schedulling-autocomplete.component.html',
  styleUrls: ['./instructor-schedulling-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class InstructorSchedullingAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: boolean = true;
  items: InstrutorAgendamentoModel[];
  filteredItems: Observable<InstrutorAgendamentoModel[]>;
  private innerValue: any = '';

  constructor(
    private _service: ServicesSubject,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._service
      .getInstrutorAgendamento()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredItems = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.items.slice();
                if (value && value.instrutorNome) {
                  itens = this._filter(value)
                } else if (typeof value == 'number') {
                  itens = this._filterById(value);
                  this.fControl.setValue(itens[0]);
                  this._cdr.detectChanges();
                } else {
                  itens = this._filter(value);
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
          const items = Helper.changeToUpercase(res, 'instrutorNome');
          this.items = Helper.sortItems(items, 'instrutorNome');
        }
      )
  }


  getName(item): string {
    return item ? item.instrutorNome : '';
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

  private _filter(value: any): InstrutorAgendamentoModel[] {
    const filterValue = value.instrutorNome ? value.instrutorNome.toLowerCase() : value;
    return  this.items.filter(item => item.instrutorNome.toLocaleLowerCase().match(filterValue))
  }

  private _filterById(value: any): InstrutorAgendamentoModel[] {
    return this.items.filter((item: InstrutorAgendamentoModel) => item.id == value);
  }
}
