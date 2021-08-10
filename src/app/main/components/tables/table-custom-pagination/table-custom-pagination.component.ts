import { catchError, finalize, tap, take, takeWhile } from 'rxjs/operators';
import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of as observableOf, of } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Helper } from '@utils/helper';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableService } from './../table-service';

@Component({
  selector: 'app-table-custom-pagination',
  templateUrl: './table-custom-pagination.component.html',
  styleUrls: ['./table-custom-pagination.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableCustomPaginatorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() service: string;
  @Output() paginatorEmitter: EventEmitter<MatPaginator> = new EventEmitter(null);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading: boolean = false;
  displayedColumns: string[] = [];
  filtereItens: Observable<any[]>;
  filtersName: string = '';
  length: number = 0;
  tableContent: TableCustom;
  pageSize: number = 0;
  items: any[] = new Array<any>();
  private _subscription: Subscription;

  constructor(
    private _tableService: TableService,
    private _cdr: ChangeDetectorRef
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadTable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._subscription.add(
      this.paginator.page
        .pipe(tap(() => {
          /*
            if (this.paginator.pageSize != this.pageSize) {
              this.pageSize = this.paginator.pageSize;
              this.paginator.firstPage();
            }
          */
          this.paginatorEmitter.emit(this.paginator);
        }))
        .subscribe()
    )

    this._subscription.add(
      this._tableService.getEndPointPageCount().subscribe(
        (res: Observable<any>) => {
          res.subscribe(x => {
            this.length = x;
            this.paginator.firstPage();
            this._cdr.detectChanges();
          })
        }
      )
    )

    this._subscription.add(
      this._tableService.getEndPointData().subscribe(
        () => {
          this.loadData()
        }
      )
    )

    this._cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._cdr.detectChanges();
  }

  getNameColumns(columnData) {
    const columns = Helper.sortArray(Object.keys(columnData));
    columns.forEach(element => {
      const name = columnData[element].header;
      this.filtersName += Helper.capitalizeFirstLetter(name) + ', ';
    })
  }

  getFromObject(item, object) {
    const objects = object.split('.');
    try {
      objects.forEach(element => item = item[element]);
    } catch (err) {
      item = '-'
    }
    return item;
  }

  loadTable() {
    this._subscription.add(
      this._tableService.getTableCustom().pipe(
        catchError(() => of(new TableCustom())),
        finalize(() => { })
      )
        .subscribe(res => {
          this.pageSize = res.pageSize;
          this.tableContent = res;
          this.displayedColumns = res.columns;
        })
    )
  }

  loadData() {
    if (!this.loading) {
      this.loading = true;
      this._tableService.setLoading(true);
      setTimeout(() => {
        this._tableService.setLoading(true);
        this.filtereItens = this.paginator.page
          .pipe(
            takeWhile(() => !this.loading),
            startWith({}),
            switchMap(() => {
              this.items = [];
              return this._tableService!.getEndPoint();
            }),
            map(data => {
              this.items = data;
              this.loading = false;
              this._tableService.setLoading(false);
              this._cdr.detectChanges();
              return data;
            }),
            catchError(() => {
              this.loading = false;
              return observableOf([]);
            })
          );
        this._cdr.detectChanges();
      }, 300);
    }
  }
}
