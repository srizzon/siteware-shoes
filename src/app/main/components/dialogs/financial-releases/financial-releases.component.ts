import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialRelease } from '@models/financial.model';

export interface FinancialReleasesInterface {
  lancamentosFinanceiros: FinancialRelease[];
}
@Component({
  templateUrl: './financial-releases.component.html',
  styleUrls: ['./financial-releases.component.scss']
})
export class FinancialReleasesComponent {

  dataSource: MatTableDataSource<FinancialRelease>;
  displayedColumns = ['emition', 'paymentType', 'value', 'payedValue', 'status'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: FinancialReleasesInterface) {
    this.dataSource = new MatTableDataSource(data.lancamentosFinanceiros);
  }
}
