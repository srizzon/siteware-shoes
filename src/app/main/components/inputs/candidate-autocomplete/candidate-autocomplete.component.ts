import { Component, OnInit, forwardRef, Input, ViewEncapsulation, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, take } from 'rxjs/operators';

import { Candidato } from '@models/gestao/candidato.model';
import { CandidatoGestaoService } from '@services/apis/gestao/candidato-gestao.service';
import { Helper } from '@utils/helper';
import { Toast } from '@services/outros/toast.service';

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CandidateAutocompleteComponent),
  multi: true
};
@Component({
  selector: 'app-candidate-autocomplete',
  templateUrl: './candidate-autocomplete.component.html',
  styleUrls: ['./candidate-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
})
export class CandidateAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() fControl: FormControl = new FormControl();
  @Input() valueCandidate: Candidato = null;
  @Output() candidateSelect: EventEmitter<Candidato> = new EventEmitter<Candidato>();

  candidates: Candidato[];
  filtered: Observable<Candidato[]>;
  private innerValue: any = '';

  constructor(
    private candidatoService: CandidatoGestaoService,
    private toast: Toast
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.candidatoService.getCandidatos()
      .pipe(
        take(1),
        tap(
          () =>
            this.filtered = this.fControl.valueChanges
              .pipe(
                startWith(''),
                map(value => {
                  return value ? this._filter(value) : this.candidates.slice()
                })
              )
        )
      )
      .subscribe(
        (res) => {
          const candidates = Helper.changeToUpercase(res, 'nome');
          this.candidates = Helper.sortItems(candidates, 'nome');
          if (this.fControl.value) {
            const candidates = this._filterById(this.fControl.value);
            this.fControl.setValue(candidates[0]);
          }
          if (this.valueCandidate) {
            this.fControl.setValue(this.valueCandidate);
          }
        },
        () => this.toast.error('Candidatos', 'Não foi possível carregar os candidatos.')
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

  propagateChange = (_: any) => { }

  private _filter(value: any): Candidato[] {
    const filterValue = value.nome ? value.nome.toLowerCase() : value.toLowerCase();
    return this.candidates.filter(candidate => candidate.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: any): Candidato[] {
    return this.candidates.filter(candidates => candidates.id == value);
  }
}
