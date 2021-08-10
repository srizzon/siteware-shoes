import { ReportButtonsEnum } from './../../enums/report-buttons.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable(
  { providedIn: 'root' }
)
export class ReportService {

  private _reportSubject = new BehaviorSubject<ReportButtonsEnum>(null);
  private _report: boolean = false;
  private _typeReport: ReportButtonsEnum = null;

  setReport(report: ReportButtonsEnum): void {
    this._report = true;
    this._typeReport = report;
    this._reportSubject.next(report);
  }

  getReportObserver(): Observable<ReportButtonsEnum> {
    return this._reportSubject.asObservable();
  }

  getReport(): boolean {
    return this._report;
  }

  getTypeReport(): ReportButtonsEnum {
    return this._typeReport;
  }

  clear(): void {
    this._reportSubject.next(null);
    this._typeReport = null;
    this._report = false;
  }
}
