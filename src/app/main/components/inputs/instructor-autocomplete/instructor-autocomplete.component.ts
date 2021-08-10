import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Component, Input, OnInit, forwardRef, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { InstrutorModel } from '@models/gestao/instrutor.model';
import { Helper } from '@utils/helper';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { Toast } from '@services/outros/toast.service';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InstructorAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-instructor-autocomplete',
  templateUrl: './instructor-autocomplete.component.html',
  styleUrls: ['./instructor-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class InstructorAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  instructors: InstrutorModel[];
  filteredInstrutors: Observable<InstrutorModel[]>;
  private innerValue: any = '';

  constructor(
    private _servicesSubject: ServicesSubject,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._servicesSubject
      .getInstrutor()
      .pipe(
        take(1),
        tap(
          () => {
            this.filteredInstrutors = this.fControl.valueChanges.pipe(
              startWith(''),
              map(value => {
                let itens = this.instructors.slice();
                if (value && value.nome) {
                  itens = this._filter(value)
                } else if (typeof value == 'number') {
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
          const instructors = Helper.changeToUpercase(res, 'nome');
          this.instructors = Helper.sortItems(instructors, 'nome');
        }
      )
  }

  getInstructorName(instructor) {
    return instructor ? instructor.nome : '';
  }

  clearInstructor(event) {
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

  private _filter(value: any): InstrutorModel[] {
    const filterValue = value.nome ? value.nome.toLowerCase() : value;
    return this.instructors.filter(instructor => instructor.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): InstrutorModel[] {
    return this.instructors.filter((instructor: InstrutorModel) => instructor.id == value);
  }
}
