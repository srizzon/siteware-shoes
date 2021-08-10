import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FilterModel } from '@models/outros/filter.model';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { FilterService } from '@services/outros/filter.service';
import { UserControllerService } from '@services/outros/user-controller.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @ViewChild('filter') filter: ElementRef;
  clearFilterDate: boolean = false;
  filterTypeEnum = FilterTypeEnum;
  filters: FilterModel[] = [];
  formFilter: FormGroup;
  hiddenFilter: boolean = true;
  private _subscription: Subscription;

  constructor(
    private _renderer: Renderer2,
    private _filterService: FilterService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._observFilter();
    this._getFilters();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  close() {
    this._filterService.changeDisplay();
  }

  applyFilter() {
    const value = this.formFilter.getRawValue();
    let objReturn = Object.assign({}, {});
    Object.keys(value).forEach(
      key => {
        if (value[key] && value[key].valueOf()) {
          const filter = this.filters.find(x => x.param === key);
          if (filter.filterType === FilterTypeEnum.DATE) {
            objReturn[key] = moment(value[key]).format("YYYY-MM-DD");
          } else if ((filter.filterType === FilterTypeEnum.SELECT) || (filter.filterType === FilterTypeEnum.LOCAL_EXAME)) {
            if (filter.typeSelectReturn == 'ENUM_NAME') {
              objReturn[key] = value[key]['enum'];
            } else {
              objReturn[key] = value[key]['id'];
            }
          } else {
            objReturn[key] = value[key]
          }
        }
      }
    )
    objReturn = Object.keys(objReturn).length > 0 ? objReturn : {};
    this._filterService.setResults(objReturn);
    this._filterService.changeDisplay();
  }

  creatForm() {
    let group = {};
    this.filters.forEach(filter => group[filter.param] = new FormControl(''));
    this.formFilter = new FormGroup(group);
  }

  clearFilters() {
    this.clearFilterDate = Object.assign('', true);
    this.formFilter.reset();
  }

  private _getFilters(): void {
    this._subscription.add(
      this._filterService
        .getFilters()
        .subscribe((res) => {
          if (res) {
            this.filters = res
            this.creatForm();
          }
        })
    )
  }

  private _observFilter(): void {
    this._subscription.add(
      this._filterService
        .getDisplay()
        .subscribe((res) => {
          this.hiddenFilter = res
          if (this.filter) {
            if (this.hiddenFilter) {
              this._renderer.setStyle(this.filter.nativeElement, 'right', '-512px');
            } else {
              this._renderer.setStyle(this.filter.nativeElement, 'right', '0');
            }
          }
        })
    )
  }
}
