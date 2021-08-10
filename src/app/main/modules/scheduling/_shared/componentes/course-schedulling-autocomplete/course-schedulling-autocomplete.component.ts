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
  useExisting: forwardRef(() => CourseSchedullingAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-course-schedulling-autocomplete',
  templateUrl: './course-schedulling-autocomplete.component.html',
  styleUrls: ['./course-schedulling-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class CourseSchedullingAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: boolean = true;
  items: CursoAgendamentoModel[];
  filteredItems: Observable<CursoAgendamentoModel[]>;
  private innerValue: any = '';

  constructor(
    private _service: ServicesSubject,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._service
      .getCursoAgendamento()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredItems = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let items = this.items.slice();
                if (value && value.descricao) {
                  items = this._filter(value)
                } else if (typeof value == 'number') {
                  items = this._filterById(value);
                  this.fControl.setValue(items[0]);
                } else {
                  items = this._filter(value)
                }
                return items
              })
            )
          }
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
      )
  }

  getName(item): string {
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

  private _filter(value: any): CursoAgendamentoModel[] {
    const filterValue = value.descricao ? value.descricao.toLowerCase() : value;
    return this.items.filter(item => item.descricao.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): CursoAgendamentoModel[] {
    return this.items.filter((item: CursoAgendamentoModel) => item.id == value);
  }
}
