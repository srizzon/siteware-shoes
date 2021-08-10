import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { Audit } from '@models/financial.model';
import { FinancialService } from '@services/apis/financeiro/financial.service';

@Component({
  selector: 'app-audit-partner-page',
  templateUrl: './audit-partner-page.component.html',
  styleUrls: ['./audit-partner-page.component.scss']
})
export class AuditPartnerPageComponent implements OnInit {

  filterForm: FormGroup;
  dataSource: MatTableDataSource<Audit> = new MatTableDataSource<Audit>();
  displayedColumns = ['cpf', 'description', 'validDate', 'value', 'status'];
  private _subscription: Subscription;

  constructor(
    private financialService: FinancialService,
    private formBuilder: FormBuilder
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  buildForm(): void {
    this.filterForm = this.formBuilder.group({
      cfc: '',
    });
  }

  onSubmit(): void {
    const { cnpj } = this.filterForm.get('cfc').value;
    if (cnpj) {
      this._subscription.add(
        this.financialService.getAudits(cnpj).subscribe(audits => {
          this.dataSource.data = audits;
        })
      )
    }
  }

}
