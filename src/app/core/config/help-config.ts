import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpConfig {

  constructor(private configService: ConfigService) {}

  public get DOCUMENT_API(): string { return this.configService.getEndPoint('CFC_WEB', 'DOCUMENT'); }

  public get FINANCIAL_API(): string { return this.configService.getEndPoint('CFC_WEB', 'FINANCIAL'); }

  public get IDENTITY_API(): string { return this.configService.getEndPoint('CFC_WEB', 'IDENTITY'); }

  public get MANAGEMENT_API(): string { return this.configService.getEndPoint('CFC_WEB', 'GESTAO'); }

  public get MONITORING_API(): string { return this.configService.getEndPoint('CFC_WEB', 'MONITORING'); }

  public get SCHEDULING_API(): string { return this.configService.getEndPoint('CFC_WEB', 'SCHEDULING'); }

  public get PRACTICAL_SCHEDULING_API(): string { return this.configService.getEndPoint('CFC_WEB', 'PRACTICAL_SCHEDULING'); }

  public get VALIDATION_API(): string { return this.configService.getEndPoint('CFC_WEB', 'VALIDATION'); }
}
