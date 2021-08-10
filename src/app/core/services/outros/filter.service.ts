import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { FilterModel } from '@models/outros/filter.model';
import { UserControllerService } from '@services/outros/user-controller.service';
@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _filters$ = new BehaviorSubject<FilterModel[]>(null);
  private _result$ = new BehaviorSubject<{}>(null);
  private _display$ = new BehaviorSubject<boolean>(true);
  private _display = true;
  private _result = null;

  constructor(
    private _user: UserControllerService
  ) {}

  getFilters() {
    return this._filters$.asObservable();
  }

  setFilters(filters: FilterModel[]) {
    this._filters$.next(filters);
  }

  getResults() {
    return this._result$.asObservable();
  }

  getResultsItens() {
    return this._result;
  }

  getFiltersToReport() {
    let filter = null;
    if (this._result) {
      filter = this._result;
      if (filter.pageNumber) delete filter.pageNumber;
      if (filter.pageSize) delete filter.pageSize;
    }
    return filter
  }

  setResults(results: {}) {
    const result = Object.assign({}, results);
    this._result = result;
    this._result$.next(result);
  }

  resetFilter(): void {
    const result = Object.assign({},{});
    this._result$.next(result);
  }

  getDisplay() {
    return this._display$.asObservable();
  }

  changeDisplay() {
    this._display = !this._display;
    this._display$.next(this._display)
  }

  formatFilterToOnlyCfc(filter, paramName?: string) {
    filter[paramName] = this._user.getUserLogged().organizationCNPJ;
    return filter
  }

  formatFilterToNormalUser(filter, paramName?: string) {
    if (!this._user.isAdmin()) {
      filter[paramName] = this._user.getUserLogged().organizationCNPJ;
    }
    return filter
  }

  formatToPagecount(params, paramToBlock) {
    let filter = this.formatFilterToNormalUser({ pageSize: 1 }, paramToBlock);
    filter = Object.assign(filter, params);
    if (filter.pageNumber) {
      delete filter.pageNumber;
    }
    return filter;
  }
}
