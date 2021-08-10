import { catchError, finalize, tap } from 'rxjs/operators';
import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of as observableOf, of } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { TableCustom } from '@models/outros/table-custom.model';
import { TableService } from './../table-service';


@Component({
  selector: 'app-expansive-custom-table',
  templateUrl: './expansive-custom-table.component.html',
  styleUrls: ['./expansive-custom-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpansiveCustomTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Output() paginatorEmitter: EventEmitter<MatPaginator> = new EventEmitter(null);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement;
  displayedColumns: string[] = [];
  filtereItens: Observable<any[]>;
  length: number = 0;
  loading: boolean = false;
  selectedItem;
  tableContent: TableCustom;
  tableExpansiveContent: TableCustom;
  private _subscription: Subscription;

  constructor(
    private _tableService: TableService,
    private _cdr: ChangeDetectorRef
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._loadTable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._subscription.add(
      this.paginator.page
        .pipe(tap(() => {
          this.paginatorEmitter.emit(this.paginator);
        }))
        .subscribe()
    )

    this._subscription.add(
      this._tableService.getEndPointPageCount().subscribe(
        (res: Observable<any>) => {
          res.subscribe(x => this.length = x)
        }
      )
    )

    this._subscription.add(
      this._tableService.getEndPointData().subscribe(
        () => this._loadData()
      )
    )

    this._cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._cdr.detectChanges();
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
  private _loadTable() {
    this._subscription.add(
      this._tableService.getTableCustom().pipe(
        catchError(() => of(new TableCustom())),
        finalize(() => { })
      )
        .subscribe(res => {
          this.tableContent = res;
          this.displayedColumns = res.columns;
        })
    )
    this._subscription.add(
      this._tableService.getExpansionTableCustom().pipe(
        catchError(() => of(new TableCustom())),
        finalize(() => { })
      )
        .subscribe(res => {
          this.tableExpansiveContent = res;
        })
    )
  }

  private _loadData() {
    this.filtereItens = this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._tableService!.getEndPoint();
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      );
    this._cdr.detectChanges();
  }
}
