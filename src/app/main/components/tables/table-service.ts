import { TableCustom } from '@models/outros/table-custom.model';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TableService {


  resetPaginatorStatus: boolean = false;
  loading: boolean = false;
  paginator: MatPaginator;
  length: number = 0;
  data: any[] = [];
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  private expansionTableCustomSubject: BehaviorSubject<TableCustom> = new BehaviorSubject<TableCustom>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private resetPaginatorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tableCustomSubject: BehaviorSubject<TableCustom> = new BehaviorSubject<TableCustom>(null);

  private _endPointPageCountSubject: BehaviorSubject<Observable<any>> = new BehaviorSubject<Observable<any>>(null);
  private _endPointDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _endPoint: any;

  constructor(){
  }

  getResetPaginatorStatus(): Observable<boolean> {
    return this.resetPaginatorSubject.asObservable();
  }

  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  setData(data: any[]):void {
    this.data = data;
    this.dataSubject.next(data);
  }

  isLoading(): boolean {
    return this.loading;
  }
  getLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
    this.loadingSubject.next(loading);
  }

  getTableCustom(): Observable<TableCustom> {
    return this.tableCustomSubject.asObservable();
  }

  setTableCustom(tableCustom: TableCustom): void {
    this.tableCustomSubject.next(tableCustom);
  }

  getExpansionTableCustom(): Observable<TableCustom> {
    return this.expansionTableCustomSubject.asObservable();
  }

  setExpansionTableCustom(tableCustom: TableCustom): void {
    this.expansionTableCustomSubject.next(tableCustom);
  }

  getEndPointPageCount(): Observable<any> {
    return this._endPointPageCountSubject.asObservable();
  }

  setEndPointPageCount(pageCount: any): void {
    this._endPointPageCountSubject.next(pageCount);
  }

  getEndPointData(): Observable<any> {
    return this._endPointPageCountSubject.asObservable();
  }

  setEndPointData(endPointdata: any): void {
    this._endPoint = endPointdata;
    this._endPointDataSubject.next(endPointdata);
  }

  getEndPoint(): Observable<any> {
    return this._endPoint;
  }

}
