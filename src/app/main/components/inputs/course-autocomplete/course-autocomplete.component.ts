import { startWith, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef, ViewEncapsulation, Input } from '@angular/core';
import { Toast } from '@services/outros/toast.service';

import { CursoGestaoModel } from '@models/gestao/curso-gestao.model';
import { CursoGestaoService } from '@services/apis/gestao/curso-gestao.service';
import { Helper } from '@utils/helper';


export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CourseAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-course-autocomplete',
  templateUrl: './course-autocomplete.component.html',
  styleUrls: ['./course-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class CourseAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() label: boolean = true;
  courses: CursoGestaoModel[];
  filteredCoursers: Observable<CursoGestaoModel[]>;
  private innerValue: any = '';

  constructor(
    private _cursoService: CursoGestaoService,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this._cursoService
      .getAllCourses()
      .pipe(
        take(1),
        tap(
          () => (this.filteredCoursers = this.fControl.valueChanges
            .pipe(
              startWith(''),
              map((value) => value ? this._filter(value) : this.courses.slice())
            ))
        )
      )
      .subscribe(
        (res) => {
          const courses = Helper.changeToUpercase(res, 'nome');
          this.courses = Helper.sortItems(courses, 'nome');
          if (this.fControl.value) {
            const value = this._filterById(this.fControl.value);
            this.fControl.setValue(value[0]);
          }
        }
      );
  }

  getCourseName(course) {
    return course ? course.nome : '';
  }

  clearCourse(event) {
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

  private _filter(value: any): CursoGestaoModel[] {
    const filterValue = value.nome ? value.nome.toLowerCase() : value.toLowerCase();
    return this.courses.filter((course) => course.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): CursoGestaoModel[] {
    return this.courses.filter((item) => item.codigoCursoExterno == value);
  }
}
