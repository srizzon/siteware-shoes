import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { FinancialService } from '@services/apis/financeiro/financial.service';
import { FinancialRelease } from '@models/financial.model';

@Component({
  selector: 'app-cash-flow-page',
  templateUrl: './cash-flow-page.component.html',
  styleUrls: ['./cash-flow-page.component.scss']
})
export class CashFlowPageComponent implements OnInit {

  filterForm: FormGroup;
  dataSource: MatTableDataSource<FinancialRelease> = new MatTableDataSource<FinancialRelease>();
  dataSourceLate: MatTableDataSource<FinancialRelease> = new MatTableDataSource<FinancialRelease>();
  displayedColumns = ['description', 'paymentDate', 'validDate', 'type', 'value'];
  total = 0;
  totalVenciment = 0;
  private _subscription: Subscription;

  constructor(
    private financialService: FinancialService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.filterForm = this.formBuilder.group({
      cfc: '',
      initialDate: new Date(),
      finalDate: new Date()
    });
  }

  onSubmit(): void {

    const { cfc: { cnpj }, initialDate, finalDate } = this.filterForm.value;
    const dataPagamentoInicio = this.datePipe.transform(initialDate, 'yyyy-MM-dd');
    const dataPagamentoFim = this.datePipe.transform(finalDate, 'yyyy-MM-dd');
    const dataVencimentoInicio = this.datePipe.transform(initialDate, 'yyyy-MM-dd');
    const dataVencimentoFim = this.datePipe.transform(finalDate, 'yyyy-MM-dd');

    if (cnpj) {
      this._subscription.add(
        this.financialService.financialReleases(cnpj, { status: 'P', dataPagamentoInicio, dataPagamentoFim })
          .subscribe(releases => {
            this.dataSource.data = releases.lancamentos;
            this.total = releases.total;
          }
          )
      )
      this._subscription.add(
        this.financialService.financialReleasesPendent(cnpj, dataVencimentoInicio, dataVencimentoFim)
          .subscribe(releases => {
            this.dataSourceLate.data = releases.lancamentos;
            this.totalVenciment = releases.total;
          }
        )
      )
    }
  }
}
