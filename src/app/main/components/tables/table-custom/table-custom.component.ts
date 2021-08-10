import { Component, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Helper } from '@utils/helper';
import { TableCustom } from '@models/outros/table-custom.model';

@Component({
  selector: 'app-table-custom',
  templateUrl: './table-custom.component.html',
  styleUrls: ['./table-custom.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableCustomComponent implements OnChanges, AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() set tableData(value: any) { this.tableContent = value; }
  @Input() set data(value: any) { this.dataValue = value; }

  tableContent: TableCustom;
  dataValue: any;
  loadData = false;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  filtersName: string = '';
  displayFilter: boolean = true;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.tableData && changes.tableData.currentValue) {
      if (this.tableContent.displayFilter != null) {
        this.displayFilter = this.tableContent.displayFilter;
      }
      this.dataSource.data = this.tableContent.data;
      this.displayedColumns = this.tableContent.columns;
      this.getNameColumns(changes.tableData.currentValue.columnData);
    }
    if (changes && changes.data && changes.data.currentValue) {
      this.dataSource.data = changes.data.currentValue;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.loadData = true;
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFromObject(item, object) {
    if (item) {
      const objects = object.split('.');
      objects.forEach(element => item = item[element]);
      return item;
    } else {
      return '-';
    }
  }

  getNameColumns(columnData){
    const columns = Helper.sortArray(Object.keys(columnData));
    columns.forEach(element => {
      const name = columnData[element].header;
      this.filtersName += Helper.capitalizeFirstLetter(name) + ', ';
    })
  }
}
