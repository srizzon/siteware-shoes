import { ReportButtonsEnum } from './../../../core/enums/report-buttons.enum';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-report-button',
  templateUrl: './report-button.component.html',
  styleUrls: ['./report-button.component.scss']
})
export class ReportButtonComponent implements OnInit {

  displayButtons: boolean = false;
  typeReport = ReportButtonsEnum;

  @Output() reportButtonEmmiter: EventEmitter<string> = new EventEmitter();

  constructor( ) { }

  ngOnInit( ): void {
  }

  selectReport(type): void {
    this.reportButtonEmmiter.emit(type);
    this.displayButtons = !this.displayButtons;
  }
}
